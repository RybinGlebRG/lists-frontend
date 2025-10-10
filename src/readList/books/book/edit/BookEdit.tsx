import { useSelector, useDispatch } from 'react-redux'
import {JSX} from 'react';
import useBook from '../useBook';
import useAuthorList from '../../../authors/useAuthorsList';
import useBookTypes from '../useBookTypes';
import useBookStatuses from '../useBookStatuses';
import * as dateUtils from '../../../../utils/dateUtils'
import { Formik, Field, FieldArray} from 'formik';
import {
    openBook,
    openBookList
} from '../../booksSlice.js'
import useTags from '../../../../tags/useTags';
import PutBookRequest, { ReadingRecordPutView } from '../../api/PutBookRequest';
import useSeriesList from '../../../../dao/series/useSeriesList';
import * as dt from '../../../../utils/dateUtils';
import DivFormGroup from '../../../../views/common/DivFormGroup';
import Tag from '../../../../domain/tag/Tag';
import TagsSelector from '../../../../views/book/edit/TagsSelector';
import SeriesSelector from '../../../../views/book/edit/SeriesSelector';
import { ISeriesItem } from '../../../../dao/series/ISeriesList';


interface ReadingRecordForm {
    id: number | null, 
    startDate: string,
    endDate: string | null,
    statusId: number | null,
    lastChapter: number | null
} 

export interface SeriesForm {
    id: string,
    title: string
}

export interface TagForm {
    id: string,
    name: string
}

export interface BookForm {
    id: number,
    title: string,
    authorId: number,
    statusId: number,
    // series: this.props.store.book.series.length > 0 ?this.props.store.book.series[0].seriesId: null,
    // order: this.props.store.book.series.length > 0 ? this.props.store.book.series[0].seriesOrder: null,
    // lastChapter: number,
    bookTypeId: number | undefined,
    createDate: string,
    note: string | null,
    readingRecords: ReadingRecordForm[],
    url: string | null,
    tags: TagForm[],
    series: SeriesForm[],
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
    const authorList = useAuthorList();
    const bookTypes = useBookTypes({listId: store.listId});
    const bookStatuses = useBookStatuses({listId: store.listId});
    // const {readingRecordsError, readingRecordsIsLoaded, readingRecords, submitReadingRecords } = useReadingRecords({bookId: store.bookId});
    const tagsData = useTags();
    const seriesList = useSeriesList();


    function handleSaveValue(values: BookForm){
        let postBookRequest = new PutBookRequest(
            store.userId,
            store.JWT,
            store.bookId,
            values.title,
            values.authorId,
            values.statusId,
            values.series.length > 0 ? parseInt(values.series[0].id) : null,
            null,
            null,
            values.bookTypeId,
            dateUtils.fromStringZonedToStringUTC(values.createDate),
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
                    dateUtils.fromStringZonedToStringUTC(item.startDate), 
                    item.endDate != null ? dateUtils.fromStringZonedToStringUTC(item.endDate) : null, 
                    item.lastChapter
                );
            }),
            values.tags.map(item => parseInt(item.id))
        );

        updateBook(
            postBookRequest,
            () => dispatch(openBook({bookId: store.bookId}))
        );

        // submitReadingRecords({
        //     readingRecordsToUpdate: values.readingRecords
        // });
    }

    let displayResult: JSX.Element | null = null;

    if (error || authorList.error || bookTypes.error || bookStatuses.error || tagsData.error){
        displayResult=( <div className="alert alert-danger" role="alert">{error + authorList.error + bookTypes.error + bookStatuses.error}</div>);
    } else if (!isLoaded || !authorList.isLoaded || !bookTypes.isLoaded || !bookStatuses.isLoaded || !tagsData.isLoaded){
        displayResult=( 
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only"/>
                </div>
            </div>
        );
    } else if (book != null && authorList.authors != null && bookTypes.bookTypes != null && tagsData.data != null && seriesList != null && seriesList.seriesList != null && bookStatuses.bookStatuses != null){

        let authorsItems: any[] = []
        for (let i = 0; i <authorList.authors.length; i++){
            // authorsItems.push(<option key={i} value={i}>{i}</option>)
            authorsItems.push(<option value={authorList.authors[i].authorId}>{authorList.authors[i].name}</option>)
        }

        // let seriesItems=[]
        // for (let i = 0; i < this.state.series.length; i++){
        //     seriesItems.push(<option value={this.state.series[i].seriesId}>{this.state.series[i].title}</option>)
        // }

        let bookTypesArray: JSX.Element[] = []
        for (let i = 0; i < bookTypes.bookTypes.length; i++){
            bookTypesArray.push(<option value={bookTypes.bookTypes[i].id}>{bookTypes.bookTypes[i].name}</option>)
        }

        let bookStatusesArray: JSX.Element[] = []
        for (let i = 0; i < bookStatuses.bookStatuses.length; i++){
            bookStatusesArray.push(<option value={bookStatuses.bookStatuses[i].statusId}>{bookStatuses.bookStatuses[i].statusName}</option>)
        }

        let tagsArray: JSX.Element[] = []
        for (let i = 0; i < tagsData.data.length; i++){
            tagsArray.push(<option value={tagsData.data[i].id}>{tagsData.data[i].name}</option>)
        }

        const initialValues: BookForm = {
            id: book.id,
            title: book.title, 
            authorId: book.textAuthors.length > 0 ? book.textAuthors[0].authorId: null,
            statusId: book.bookStatus.statusId,
            // series: this.props.store.book.series.length > 0 ?this.props.store.book.series[0].seriesId: null,
            // order: this.props.store.book.series.length > 0 ? this.props.store.book.series[0].seriesOrder: null,
            // lastChapter: book.lastChapter,
            bookTypeId: book.bookType ? book.bookType.typeId: undefined,
            createDate: dateUtils.fromDateToStringInputZoned(book.insertDate),
            note: book.note,
            readingRecords: book.readingRecords.map(item => {
                let res: ReadingRecordForm = {
                    id: item.id, 
                    startDate: dateUtils.fromDateToStringInputZoned(item.startDate),
                    endDate: item.endDate != null ? dateUtils.fromDateToStringInputZoned(item.endDate) : null,
                    statusId: item.bookStatus.statusId,
                    lastChapter: item.lastChapter
                }
                return res;
            }),
            url: book.URL,
            tags: book.tags.map(item => {
                let res: TagForm = {
                    id: item.id.toString(),
                    name: item.name
                }
                return res;
            }),
            series: book.seriesList.map(item => {
                let res: SeriesForm = {
                    id: item.id.toString(),
                    title: item.title
                }
                return res;
            })
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
                                            <label htmlFor="titleInput" className="form-label">Title</label>
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


                                <Field 
                                    name="authorId"
                                >
                                    {({
                                        field,
                                        meta
                                    })=>(    
                                        <DivFormGroup controlId={field.name}>
                                            <label>Author</label >
                                            <select className="form-control" 
                                                as="select"
                                                name={field.name}
                                                {...field}    
                                            >   
                                                <option value="" >--</option>
                                                {authorsItems}
                                            </select>
                                        </DivFormGroup>                                    
                                    )}
                                </Field>

                                <Field 
                                    name="bookTypeId"
                                >
                                    {({
                                        field,
                                        meta
                                    })=>(    
                                        <DivFormGroup controlId={field.name}>
                                            <label>Book Type</label >
                                            <select 
                                                className="form-control" 
                                                as="select"
                                                name={field.name}
                                                 {...field}    
                                            >   
                                                <option value='' >--</option>
                                                {/* <option value="1">Book</option>
                                                <option value="2">Light Novel</option>
                                                <option value="3">Webtoon</option> */}
                                                {bookTypesArray}
                                            </select>
                                        </DivFormGroup>                                   
                                    )}
                                </Field>

                                

                                <DivFormGroup controlId="createDate">
                                    <label>Creation date</label>
                                    <input className="form-control" 
                                        type="datetime-local" 
                                        name="createDate"
                                        value={values.createDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </DivFormGroup>

                                <Field name="note">
                                    {({
                                        field
                                    })=>(
                                        <DivFormGroup controlId={field.name}>
                                            <label>Note</label>
                                            <textarea
                                                className="form-control" 
                                                rows="3"
                                                {...field}                             
                                            />
                                        </DivFormGroup> 
                                    )}

                                </Field>

                                <Field name="url">
                                    {({
                                        field
                                    })=>(
                                        <DivFormGroup controlId={field.name}>
                                            <label>URL</label>
                                            <input className="form-control" 
                                                type="text" 
                                                placeholder="URL"
                                                {...field}  
                                            />
                                        </DivFormGroup> 
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
                                                                    <DivFormGroup controlId="readingRecords">
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
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </DivFormGroup>
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
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
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
                                        <TagsSelector
                                            values={values}
                                            tagsArray={tagsArray}
                                            tags={tagsData.data != null ? tagsData.data : []}                                            
                                        />
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-md-auto">
                                        <SeriesSelector
                                            values={values}
                                            seriesList={seriesList.seriesList != null ? seriesList.seriesList.items : []}
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