import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import useBook from '../useBook.js';
import useAuthorList from '../../../authors/useAuthorsList.js';
import { selectBookId } from '../../booksSlice.js';
import useBookTypes from '../useBookTypes.js';
import useBookStatuses from '../useBookStatuses.js';
import * as dateUtils from '../../../../utils/dateUtils.js'
import { Formik} from 'formik';
import * as booksApi from '../bookApi.js'
import {openSignIn} from '../../../../displayAreaSlice.js'
import {
    openBook,
    openBookList
} from '../../booksSlice.js'
import ReadingRecordList from './ReadingRecordList.js';
import useReadingRecords from '../useReadingRecords';
import * as readingRecordsApi from  '../../readingRecordsApi.js';


export default function BookEdit(){
    const dispatch = useDispatch();

    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        bookId: useSelector(state=>state.booksReducer.bookId),
        listId: useSelector(state=>state.listsReducer.listId),
    }

    const {error, isLoaded, book, createDate } = useBook({listId: store.listId, bookId: store.bookId});
    const [authorListError, authorListIsLoaded, authors] = useAuthorList({listId: store.listId});
    const [bookTypesError, bookTypesIsLoaded, bookTypes] = useBookTypes({listId: store.listId});
    const [bookStatusesError, bookStatusesIsLoaded, bookStatuses] = useBookStatuses({listId: store.listId});
    const {readingRecordsError, readingRecordsIsLoaded, readingRecords } = useReadingRecords({bookId: store.bookId});

    const [saveError, setSaveError] = useState(null);
	const [saveIsLoaded,setSaveIsLoaded] = useState(false);

    async function saveValues({book, readingRecords}){
        let res = await booksApi.postBook({JWT: store.JWT, bookId: store.bookId, body: book, onUnauthorized: ()=> dispatch(openSignIn())})
        // for (let i = 0; i<readingRecords.length; i++){
        //     let item = readingRecords[i];
        //     let body = {
        //         statusId: item.bookStatus.statusId,
        //         startDate: item.startDate,
        //         endDate: item.endDate
        //     }
        //     res = await readingRecordsApi.put({JWT: store.JWT, readingRecordId: item.recordId, body: body, onUnauthorized: ()=> dispatch(openSignIn())});
        // }
        
    }

    function handleSaveValue(values){
        let dt = dateUtils.postprocessValues(values.createDate);
        let book = {
            readListId: store.listId,
            title: values.title,
            status: values.status,
            lastChapter: values.lastChapter,
            insertDateUTC: dt, //this.props.store.book.insertDate
            note: values.note
        }

        if (values.author != ""){
            book.authorId = values.author;
        }

        // if (values.series != ""){
        //     book.seriesId = values.series;
        //     book.order = values.order;
        // }

        if (values.bookType != null && values.bookType != ""){
            book.bookTypeId = values.bookType;
        }

        const body = JSON.stringify(book);

        setSaveIsLoaded(false);
        // booksApi.postBook({JWT: store.JWT, bookId: store.bookId, body: body, onUnauthorized: ()=> dispatch(openSignIn())})
        saveValues({book: book, readingRecords: values.readingRecords})
        .then(()=>{
            setSaveError(null)
            setSaveIsLoaded(true);
            dispatch(openBook({bookId: store.bookId}));
        })
        .catch((error)=>{
            setSaveError(error.message)
            setSaveIsLoaded(true);
            alert(error.message);
        })
    }

    let displayResult;

    if (error || authorListError || bookTypesError || bookStatusesError){
        displayResult=( <div class="alert alert-danger" role="alert">{error + authorListError + bookTypesError + bookStatusesError}</div>);
    } else if (!isLoaded || !authorListIsLoaded || !bookTypesIsLoaded || !bookStatusesIsLoaded){
        displayResult=( 
            <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" role="status">
                    <span class="sr-only"/>
                </div>
            </div>
        );
    } else {
        
        let createDate = dateUtils.preprocessValues(book.insertDate)

        let authorsItems=[]
        for (let i = 0; i <authors.length; i++){
            // authorsItems.push(<option key={i} value={i}>{i}</option>)
            authorsItems.push(<option value={authors[i].authorId}>{authors[i].name}</option>)
        }

        // let seriesItems=[]
        // for (let i = 0; i < this.state.series.length; i++){
        //     seriesItems.push(<option value={this.state.series[i].seriesId}>{this.state.series[i].title}</option>)
        // }

        let bookTypesArray=[]
        for (let i = 0; i < bookTypes.length; i++){
            bookTypesArray.push(<option value={bookTypes[i].id}>{bookTypes[i].name}</option>)
        }

        let bookStatusesArray=[]
        for (let i = 0; i < bookStatuses.length; i++){
            bookStatusesArray.push(<option value={bookStatuses[i].statusId}>{bookStatuses[i].statusName}</option>)
        }

        displayResult=(
            <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col pb-2 mt-4 mb-2 border-bottom">
                            <h3>{book.title}</h3>
                    </div>
                    <div class="col-md-auto">
                        <button
                            type="button"
                            class="btn btn-secondary btn-sm"
                            onClick={()=>dispatch(openBookList())}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <Formik
                        initialValues={{ 
                            title: book.title, 
                            author: book.authors.length > 0 ? book.authors[0].authorId: null,
                            status: book.bookStatus.statusId,
                            // series: this.props.store.book.series.length > 0 ?this.props.store.book.series[0].seriesId: null,
                            // order: this.props.store.book.series.length > 0 ? this.props.store.book.series[0].seriesOrder: null,
                            lastChapter: book.lastChapter,
                            bookType: book.bookType ? book.bookType.typeId: null,
                            createDate: createDate,
                            note: book.note,
                            readingRecords: readingRecords.items
                        }}
                        validate={values => {
                            const errors = {};
                            if (!values.title) {
                                errors.title = 'Title must be set';
                            }
                            // if ((values.series && !values.order) || (values.order && !values.series)) {
                            //     errors.series = 'Series and Order must be set together';
                            //     errors.order = 'Series and Order must be set together';
                            // }
                            if (!values.status){
                                errors.status = 'Status must be set';
                            }
        
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setSubmitting(true);
                            handleSaveValue(values);
                            setSubmitting(false);
                        }}
                    >
                    {({values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting }) => (
                    <form
                    onSubmit={handleSubmit}
                    >
                        {console.log(values)}
                        <div class="form-group" controlId="title">
                            <label>Title</label>
                            <input class="form-control" 
                                type="text" 
                                placeholder="Title"
                                name="title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                            />
                            {touched.title && errors.title ? (
                            <label className="text-danger">
                                {errors.title}
                            </label>
                            ): null}
                         </div>
                        <div class="form-group" controlId="author">
                            <label>Author</label >
                            <select class="form-control" 
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
                        <div class="form-group" controlId="status">
                            <label>Status</label >
                            <select class="form-control" 
                                as="select"
                                name="status"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.status}      
                            >   
                                {bookStatusesArray}
                            </select>
                            {touched.status && errors.status ? (
                            <label className="text-danger">
                                {errors.status}
                            </label>
                            ): null}
                        </div>
                        <div class="form-group" controlId="lastChapter">
                            <label>Last chapter</label>
                            <input class="form-control" 
                                type="number" 
                                placeholder="Last chapter"
                                name="lastChapter"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastChapter}
                            />
                        </div>

                        <div class="form-group" controlId="bookType">
                            <label>Book Type</label >
                            <select class="form-control" 
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

                        <div class="form-group" controlId="createDate">
                            <label>Create date UTC</label>
                            <input class="form-control" 
                                type="datetime-local" 
                                name="createDate"
                                value={values.createDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>

                        <div class="form-group" controlId="note">
                            <label>Note</label>
                            <textarea
                                class="form-control" 
                                rows="3" 
                                name="note"
                                value={values.note}
                                onChange={handleChange}
                                onBlur={handleBlur}                                
                            />
                        </div>

                        <div class="form-group" controlId="note">
                                <label>Reading records</label>
                                <ReadingRecordList
                                    list={values.readingRecords}
                                    handleChange={handleChange}
                                />
                            </div>

                        <button  class="btn btn-primary mt-4"
                            // variant="primary" 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
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
        <div class="row">
			<div class="col">
                {displayResult}
			</div>
		</div>
    );
}