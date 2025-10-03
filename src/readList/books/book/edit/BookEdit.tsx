import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect, JSX} from 'react';
import useBook from '../useBook';
import useAuthorList from '../../../authors/useAuthorsList.js';
import { selectBookId } from '../../booksSlice.js';
import useBookTypes from '../useBookTypes.js';
import useBookStatuses from '../useBookStatuses.js';
import * as dateUtils from '../../../../utils/dateUtils'
import { Formik, Field, FieldArray} from 'formik';
import * as booksApi from '../api/bookApi'
import {openSignIn} from '../../../../displayAreaSlice.js'
import {
    openBook,
    openBookList
} from '../../booksSlice.js'
import ReadingRecordList from './ReadingRecordList.js';
import useReadingRecords from '../useReadingRecords.js';
import * as readingRecordsApi from  '../../readingRecordsApi.js';
import useTags from '../../../../tags/useTags.js';
import PutBookRequest, { ReadingRecordPutView } from '../../api/PutBookRequest';
import useSeriesList from '../../../../dao/series/useSeriesList';
import ReadingRecordModel from '../../../../domain/readingrecord/ReadingRecord';
import { BookStatus } from '../../../../domain/bookstatus/BookStatus';
import * as dt from '../../../../utils/dateUtils';

function validateTag(value) {
    if (!value){
        return 'Tag name must be set';
    }
}

function validateSeries(value) {
    if (!value){
        return 'Series name must be set';
    }
}

interface ReadingRecordForm {
    id: number | null, 
    startDate: string,
    endDate: string | null,
    statusId: number | null,
    lastChapter: number | null
} 

interface BookForm {
    id: number,
    title: string,
    authorId: number,
    statusId: number,
    // series: this.props.store.book.series.length > 0 ?this.props.store.book.series[0].seriesId: null,
    // order: this.props.store.book.series.length > 0 ? this.props.store.book.series[0].seriesOrder: null,
    // lastChapter: number,
    bookTypeId: number | null,
    createDate: string,
    note: string | null,
    readingRecords: ReadingRecordForm[],
    url: string | null,
    tagIds: number[],
    seriesIds: number[],
}


export default function BookEdit(){
    const dispatch = useDispatch();

    let store={
        JWT: useSelector((state: any) => state.listsReducer.JWT),
        bookId: useSelector((state: any) => state.booksReducer.bookId),
        listId: useSelector((state: any) => state.listsReducer.listId),
        userId: useSelector((state: any) => state.listsReducer.userId),
    }

    const {error, isLoaded, book, updateBook} = useBook();
    const [authorListError, authorListIsLoaded, authors] = useAuthorList();
    const [bookTypesError, bookTypesIsLoaded, bookTypes] = useBookTypes({listId: store.listId});
    const [bookStatusesError, bookStatusesIsLoaded, bookStatuses] = useBookStatuses({listId: store.listId});
    // const {readingRecordsError, readingRecordsIsLoaded, readingRecords, submitReadingRecords } = useReadingRecords({bookId: store.bookId});
    const [tagsError, tagsIsLoaded, tags] = useTags();
    const seriesList = useSeriesList();


    function handleSaveValue(values: BookForm){        
        let dt = dateUtils.postprocessValuesDate(values.createDate);

        let postBookRequest = new PutBookRequest(
            store.userId,
            store.JWT,
            store.bookId,
            values.title,
            values.authorId,
            values.statusId,
            values.seriesIds.length > 0 ? values.seriesIds[0] : null,
            null,
            null,
            values.bookTypeId,
            dt,
            values.note,
            values.url,
            values.readingRecords.map(item => {
                if (item.statusId == null) {
                    throw new Error("Incorrect data");
                }
                if (item.startDate == null) {
                    throw new Error("Incorrect data");
                }
                return new ReadingRecordPutView(
                    item.id, 
                    item.statusId, 
                    dateUtils.fromInputStringZoned(item.startDate), 
                    item.endDate != null ? dateUtils.fromInputStringZoned(item.endDate) : null, 
                    item.lastChapter
                );
            }),
            values.tagIds
        );

        updateBook(
            postBookRequest,
            () => dispatch(openBook({bookId: store.bookId}))
        );

        // submitReadingRecords({
        //     readingRecordsToUpdate: values.readingRecords
        // });
    }

    let displayResult: JSX.Element;

    if (error || authorListError || bookTypesError || bookStatusesError || tagsError){
        displayResult=( <div className="alert alert-danger" role="alert">{error + authorListError + bookTypesError + bookStatusesError}</div>);
    } else if (!isLoaded || !authorListIsLoaded || !bookTypesIsLoaded || !bookStatusesIsLoaded || !tagsIsLoaded){
        displayResult=( 
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only"/>
                </div>
            </div>
        );
    } else if (book != null && authors != null && bookTypes != null && tags != null && seriesList != null && seriesList.seriesList != null && bookStatuses != null){
        
        let createDate = dateUtils.preprocessValues(book.insertDate)

        let authorsItems: any[] = []
        for (let i = 0; i <authors.length; i++){
            // authorsItems.push(<option key={i} value={i}>{i}</option>)
            authorsItems.push(<option value={authors[i].authorId}>{authors[i].name}</option>)
        }

        // let seriesItems=[]
        // for (let i = 0; i < this.state.series.length; i++){
        //     seriesItems.push(<option value={this.state.series[i].seriesId}>{this.state.series[i].title}</option>)
        // }

        let bookTypesArray: JSX.Element[] = []
        for (let i = 0; i < bookTypes.length; i++){
            bookTypesArray.push(<option value={bookTypes[i].id}>{bookTypes[i].name}</option>)
        }

        let bookStatusesArray: JSX.Element[] = []
        for (let i = 0; i < bookStatuses.length; i++){
            bookStatusesArray.push(<option value={bookStatuses[i].statusId}>{bookStatuses[i].statusName}</option>)
        }

        let tagsArray: JSX.Element[] = []
        for (let i = 0; i < tags.length; i++){
            tagsArray.push(<option value={tags[i].tagId}>{tags[i].name}</option>)
        }

        let seriesListArray: JSX.Element[] = []
        for (let i = 0; i < seriesList.seriesList.items.length; i++){
            seriesListArray.push(<option value={seriesList.seriesList.items[i].seriesId}>{seriesList.seriesList.items[i].title}</option>)
        }

        const initialValues: BookForm = {
            id: book.id,
            title: book.title, 
            authorId: book.textAuthors.length > 0 ? book.textAuthors[0].authorId: null,
            statusId: book.bookStatus.statusId,
            // series: this.props.store.book.series.length > 0 ?this.props.store.book.series[0].seriesId: null,
            // order: this.props.store.book.series.length > 0 ? this.props.store.book.series[0].seriesOrder: null,
            // lastChapter: book.lastChapter,
            bookTypeId: book.bookType ? book.bookType.typeId: null,
            createDate: createDate,
            note: book.note,
            readingRecords: book.readingRecords.map(item => {
                let res: ReadingRecordForm = {
                    id: item.id, 
                    startDate: dateUtils.toStringInputZoned(item.startDate),
                    endDate: item.endDate != null ? dateUtils.toStringInputZoned(item.endDate) : null,
                    statusId: item.bookStatus.statusId,
                    lastChapter: item.lastChapter
                }
                return res;
            }),
            url: book.URL,
            tagIds: book.tags.map(item => item.id),
            seriesIds: book.seriesList.map(item => item.id)
        }

        displayResult=(
            <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col pb-2 mt-4 mb-2 border-bottom">
                            <h3>{book.title}</h3>
                    </div>
                    <div className="col-md-auto">
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={()=>dispatch(openBookList())}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Formik
                            initialValues={initialValues}
                            validate={values => {
                                const errors = {};
                                // if (!values.title) {
                                //     errors.title = 'Title must be set';
                                // }
                                // if ((values.series && !values.order) || (values.order && !values.series)) {
                                //     errors.series = 'Series and Order must be set together';
                                //     errors.order = 'Series and Order must be set together';
                                // }
                                // if (!values.status){
                                //     errors.status = 'Status must be set';
                                // }
            
                                return errors;
                            }}
                            onSubmit={(values, actions) => {
                                actions.setSubmitting(true);
                                handleSaveValue(values);
                                actions.setSubmitting(false);
                            }}
                        >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue 
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                // onSubmit={() => console.log("HERE1")}
                            >
                                {console.log(values)}

                                <Field 
                                    name="title"
                                    validate={value => {
                                        let errorMessage;
                                        if (!value) {
                                            errorMessage = 'Title must be set';
                                        }
                                        return errorMessage;
                                    }}
                                >
                                    {({
                                        field,
                                        meta
                                    })=>(                                        
                                        <div className="mb-3">
                                            <label for="titleInput" className="form-label">Title</label>
                                            <input 
                                                id="titleInput"
                                                className="form-control" 
                                                type="text" 
                                                placeholder="Title"
                                                {...field}
                                            />
                                            {meta.touched && meta.error && (
                                                <label className="text-danger">{meta.error}</label>
                                            )}
                                        </div>
                                    )}
                                </Field>    


                                <div className="form-group" controlId="author">
                                    <label>Author</label >
                                    <select className="form-control" 
                                        as="select"
                                        name="author"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.author}      
                                    >   
                                        <option value="" >--</option>
                                        {authorsItems}
                                    </select>
                                </div>

                                <div className="form-group" controlId="bookType">
                                    <label>Book Type</label >
                                    <select className="form-control" 
                                        as="select"
                                        name="bookType"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.bookType}      
                                    >   
                                        <option value='' >--</option>
                                        {/* <option value="1">Book</option>
                                        <option value="2">Light Novel</option>
                                        <option value="3">Webtoon</option> */}
                                        {bookTypesArray}
                                    </select>
                                </div>

                                <div className="form-group" controlId="createDate">
                                    <label>Create date UTC</label>
                                    <input className="form-control" 
                                        type="datetime-local" 
                                        name="createDate"
                                        value={values.createDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                <Field name="note">
                                    {({
                                        field
                                    })=>(
                                        <div className="form-group" controlId="note">
                                            <label>Note</label>
                                            <textarea
                                                className="form-control" 
                                                rows="3"
                                                {...field}                             
                                            />
                                        </div> 
                                    )}

                                </Field>

                                <Field name="url">
                                    {({
                                        field
                                    })=>(
                                        <div className="form-group" controlId="url">
                                            <label>URL</label>
                                            <input className="form-control" 
                                                type="text" 
                                                placeholder="URL"
                                                {...field}  
                                            />
                                        </div> 
                                    )}
                                </Field>

                                <div className="row mt-4">
                                    <div className="col">
                                        <FieldArray 
                                            name="readingRecords"
                                            render={arrayHelpers => (
                                                <ul className="list-group list-group-flush">
                                                    <label>Reading records</label>
                                                        { 
                                                            values.readingRecords && values.readingRecords.length > 0 ?
                                                            (
                                                                values.readingRecords.map((record, index) => (
                                                                <li 
                                                                    className="list-group-item" 
                                                                    key={index}
                                                                >
                                                                    <div className="form-group" controlId="readingRecords">
                                                                        <div className="row">
                                                                            <Field name={`readingRecords[${index}].startDate`}>
                                                                                {({
                                                                                    field,
                                                                                    meta
                                                                                })=>(
                                                                                    <div className="col">
                                                                                            <input 
                                                                                            className="form-control" 
                                                                                            type="datetime-local" 
                                                                                            {...field}
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </Field>

                                                                            <Field name={`readingRecords[${index}].endDate`}>
                                                                                {({
                                                                                    field
                                                                                })=>(
                                                                                    <div className="col">
                                                                                        <input 
                                                                                            className="form-control" 
                                                                                            type="datetime-local" 
                                                                                            {...field}
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </Field>


                                                                            <Field name={`readingRecords[${index}].statusId`}>
                                                                                {({
                                                                                    field
                                                                                })=>(
                                                                                    <div className="col">
                                                                                        <select 
                                                                                            className="form-control" 
                                                                                            as="select"
                                                                                            {...field}   
                                                                                        >   
                                                                                            {bookStatusesArray}
                                                                                        </select>
                                                                                    </div>
                                                                                )}
                                                                            </Field>

                                                                            <Field name={`readingRecords[${index}].lastChapter`}>
                                                                                {({
                                                                                    field
                                                                                })=>(
                                                                                    <div className="col">
                                                                                        <input 
                                                                                            className="form-control" 
                                                                                            type="number" 
                                                                                            placeholder="Last chapter"
                                                                                            {...field}
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </Field>

                                                                            <div className="col">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-outline-danger"
                                                                                    onClick={() => arrayHelpers.remove(index)}
                                                                                >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                ))
                                                            )
                                                            : null
                                                        }

                                                        <div className="row">
                                                            <div className="col">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-outline-success mt-2"
                                                                    onClick={() => {
                                                                        let newReadingRecord: ReadingRecordForm = {
                                                                            id: null,
                                                                            startDate: dt.currentDateForInputZoned(),
                                                                            endDate: null,
                                                                            statusId: 1,
                                                                            lastChapter: null
                                                                        }
                                                                        arrayHelpers.push(newReadingRecord);
                                                                    }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                                                    </svg>
                                                                    Add record
                                                                </button>
                                                            </div>
                                                        </div>
                                                </ul>
                                            )}                        
                                        />
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-md-auto">
                                        <FieldArray 
                                            name="tags"
                                            render={arrayHelpers => (
                                                <ul className="list-group list-group-flush">
                                                    <label>Tags</label>
                                                        { 
                                                            values.tags && values.tags.length > 0 ?
                                                            (
                                                                values.tags.map((tag, index) => (
                                                                        <li 
                                                                            className="list-group-item" 
                                                                            key={index}
                                                                        >
                                                                            <div className="form-group" controlId="tags">
                                                                                <div className="row">
                                                                                    <Field 
                                                                                        name={`tags.${index}.tagId`}
                                                                                        validate={validateTag}
                                                                                    >
                                                                                        {({
                                                                                            field,
                                                                                            meta
                                                                                        })=>(
                                                                                            <div className="col-md-auto">
                                                                                                <select 
                                                                                                    className="form-control" 
                                                                                                    as="select"
                                                                                                    {...field}   
                                                                                                >   
                                                                                                    <option value='' >Select tag</option>
                                                                                                    {tagsArray}
                                                                                                </select>
                                                                                                { meta.error ? (
                                                                                                    <label className="text-danger">
                                                                                                        {meta.error}
                                                                                                    </label>
                                                                                                ): null}
                                                                                            </div>
                                                                                        )}
                                                                                    </Field>

                                                                                    <div className="col">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-outline-danger"
                                                                                            onClick={() => arrayHelpers.remove(index)}
                                                                                        >
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                                                                            </svg>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                ))
                                                            )
                                                            : null
                                                        }

                                                        <div className="row">
                                                            <div className="col">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-outline-success mt-2"
                                                                    onClick={() => arrayHelpers.push({})}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                                                    </svg>
                                                                    Add tag
                                                                </button>
                                                            </div>
                                                        </div>
                                                </ul>
                                            )}                        
                                        />
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-md-auto">
                                        <FieldArray 
                                            name="seriesList"
                                            render={arrayHelpers => (
                                                <ul className="list-group list-group-flush">
                                                    <label>Series List</label>
                                                        { 
                                                            values.seriesIds.length > 0 ?
                                                            (
                                                                values.seriesIds.map((series, index) => (
                                                                        <li 
                                                                            className="list-group-item" 
                                                                            key={index}
                                                                        >
                                                                            <div className="form-group" controlId="seriesIds">
                                                                                <div className="row">
                                                                                    <Field 
                                                                                        name={`seriesIds[${index}]`}
                                                                                        validate={validateSeries}
                                                                                    >
                                                                                        {({
                                                                                            field,
                                                                                            meta
                                                                                        })=>(
                                                                                            <div className="col-md-auto">
                                                                                                <select 
                                                                                                    className="form-control" 
                                                                                                    as="select"
                                                                                                    {...field}   
                                                                                                >   
                                                                                                    <option value='' >Select series</option>
                                                                                                    {seriesListArray}
                                                                                                </select>
                                                                                                { meta.error ? (
                                                                                                    <label className="text-danger">
                                                                                                        {meta.error}
                                                                                                    </label>
                                                                                                ): null}
                                                                                            </div>
                                                                                        )}
                                                                                    </Field>

                                                                                    <div className="col">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-outline-danger"
                                                                                            onClick={() => arrayHelpers.remove(index)}
                                                                                        >
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                                                                            </svg>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                ))
                                                            )
                                                            : null
                                                        }

                                                        <div className="row">
                                                            <div className="col">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-outline-success mt-2"
                                                                    onClick={() => arrayHelpers.push({})}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                                                    </svg>
                                                                    Add series
                                                                </button>
                                                            </div>
                                                        </div>
                                                </ul>
                                            )}                        
                                        />
                                    </div>
                                </div>


                                {/* <div class="form-group" controlId="note">
                                        <label>Reading records REAL</label>
                                        <ReadingRecordList
                                            list={values.readingRecords}
                                            handleChange={handleChange}
                                        />
                                    </div> */}

                                <button  
                                    className="btn btn-primary mt-4"
                                    type="submit"
                                    disabled={isSubmitting}
                                >Submit</button>
                            </form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>  
        );

    }

    return(
        <div className="row">
			<div className="col">
                {displayResult}
			</div>
		</div>
    );
}