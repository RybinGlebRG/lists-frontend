import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    openSeriesItemShow,
    openSignIn
} from '../redux/actionCreators'
import { Formik} from 'formik';
import {getAuthors} from '../readList/authors/authorsApi'
import {postBooks, getBookTypes} from '../readList/books/api/bookApi'
import  {loadSeriesItem} from './seriesApi'
import {
    openSeriesItem
} from './seriesSlice'
import * as common from './common'


export default function SeriesItemAdd(props){
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [authors,setAuthors] = useState(null);
    const [bookTypes,setBookTypes] = useState(null);
    const [series,setSeries] = useState(null);
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        listId: useSelector(state=>state.listsReducer.listId),
        seriesId: useSelector(state=>state.listsReducer.seriesItem.seriesId)
    }

    useEffect(()=>{
        let promises=[];
        promises.push(getAuthors(store.JWT, store.listId, ()=>{dispatch(openSignIn())}));
        promises.push(getBookTypes(store.JWT, ()=>{dispatch(openSignIn())}));
        promises.push(loadSeriesItem(store.JWT, store.listId, store.seriesId));

        Promise.all(promises)
        .then(([authors, bookTypes, series]) =>{
            setAuthors(authors.items);
            setBookTypes(bookTypes.items);
            setSeries(series.series)
            setError(null);
            setIsLoaded(true);   
        })
		.catch(err=>{
            setError(err.message);
            setIsLoaded(true);
		});


    },[])

    
    const saveVals=(values)=>{
        let book = {
            readListId: store.listId,
            title: values.title,
            status: values.status,        
        }
    
        if (values.authors != null && values.author != ""){
            book.authorId = values.author;
        }
    
        book.seriesId = store.seriesId;
        book.order = values.order;
    
        if (values.lastChapter != null && values.lastChapter != ""){
            book.lastChapter = values.lastChapter;
        }
    
        if (values.bookType != null && values.bookType != ""){
            book.bookTypeId = values.bookType;
        }
    
        postBooks(store.JWT, store.seriesId, book,()=>{dispatch(openSignIn())})
        .then(()=>{
            dispatch(openSeriesItem());
        })
        .catch(error=>{
            setError(error.message);
        })
    }

    const getForm=()=>{
        let authorsItems=[]
        for (let i = 0; i < authors.length; i++){
            // authorsItems.push(<option key={i} value={i}>{i}</option>)
            authorsItems.push(<option value={authors[i].authorId}>{authors[i].name}</option>)
        }

        let bookTypesDisplay=[]
        for (let i = 0; i < bookTypes.length; i++){
            bookTypesDisplay.push(<option value={bookTypes[i].id}>{bookTypes[i].name}</option>)
        }

        let result=(
            <div class="row">
                    <div class="col">
                        <div class="row">
                            <common.Header
                                title={series.title + " (Add book)"}
                                buttons={[
                                    (
                                        <button 
                                            type="button"
                                            class="btn btn-secondary btn-sm"
                                            onClick={()=>{
                                                // this.props.openSeriesItemShow();
                                                dispatch(openSeriesItem());
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </button>
                                    )
                                ]}
                            />
                        </div>
                        <div class="row">
                            <div class="col">
                                <Formik 
                                    initialValues={{ 						 
                                        title: null, 
                                        author: null,
                                        status: null,
                                        lastChapter: null,
                                        bookType: null
                                    }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.title) {
                                            errors.title = 'Title must be set';
                                        }
                                        if (!values.status){
                                            errors.status = 'Status must be set';
                                        }

                                        return errors;
                                    }}
                                    onSubmit={(values, {setSubmitting, resetForm}) => {
                                        setSubmitting(true);
                                        saveVals(values);
                                        setSubmitting(false);
                                    }}
                                >
                                    {
                                        ({
                                                values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleBlur,
                                                handleSubmit,
                                                isSubmitting 
                                        }) => (
                                        <form
                                            onSubmit={handleSubmit}
                                        >
                                            {/* {console.log(values)} */}
                                            <div class="form-group" controlId="title">
                                                <label>Title</label>
                                                <input class="form-control" 
                                                    type="text" 
                                                    placeholder="Title"
                                                    name="title"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
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
                                                    <option value='' >Select status</option>
                                                    <option value="1">In progress</option>
                                                    <option value="2">Completed</option>
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
                                                    {bookTypesDisplay}
                                                </select>
                                            </div>
                                            <button  class="btn btn-primary"
                                                variant="primary" 
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Submit
                                            </button>
                                            </form>
                                        )
                                    }
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
        )
        
        return result;
    }

    let displayPanel;

    if (error){
        displayPanel=(
            <div class="alert alert-danger" role="alert">{error}</div>
        )
    } else if (!isLoaded){
        displayPanel=( 
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    } else {
        displayPanel=getForm();
    }

    return (
        <div class="row">
            <div class="col">
                {displayPanel}
            </div>
        </div>
    )
}