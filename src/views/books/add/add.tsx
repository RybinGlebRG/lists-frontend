import { JSX, useState } from 'react';
import { Formik, Field} from 'formik';
import * as common from '../../common/common'
import * as dateUtils from '../../../crosscut/utils/dateUtils'
import {openBookList} from '../../../dao/book/booksSlice'
import PostBooksRequest from '../../../dao/book/PostBooksRequest';
import * as BookRepository from '../../../dao/book/BookRepository';
import { useSelector, useDispatch } from 'react-redux'
import useAuthorList from '../../../controller/authors/useAuthorsList';
import useBookTypes from '../../../controller/books/useBookTypes';
import useBookStatuses from '../../../controller/books/useBookStatuses';
import DivFormGroup from '../../common/DivFormGroup';

export interface BookAddForm {
    title: string | null, 
    authorId: number | null,
    statusId: number | null,
    lastChapter: number | null,
    bookTypeId: number | null,
    createDate: string,
    note: string | null,
    url: string | null
}

export default function BookAdd() {
    const dispatch = useDispatch();

    let store = {
        readListId: useSelector((state: any)=>state.listsReducer.listId),
        listId: useSelector((state: any) => state.listsReducer.listId)
    }

    const [error, setError] = useState<any>(null);
    // const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const bookTypes = useBookTypes({listId: store.listId});
    const authorList = useAuthorList();
    const bookStatuses = useBookStatuses({listId: store.listId});


    function saveValues(values: BookAddForm){

        if (values.title == null || values.statusId == null) {
            throw new Error("Values cannot be null");
        }

        let postBooksRequest = PostBooksRequest.builder(
            values.title,
            values.statusId
        )
            .insertDate(values.createDate)
            .URL(values.url ?? "");

        if (values.authorId != null){
            postBooksRequest.authorId(values.authorId)
        }

        if (values.lastChapter != null){
            postBooksRequest.lastChapter(values.lastChapter);
        }

        if (values.bookTypeId != null){
            postBooksRequest.bookTypeId(values.bookTypeId);
        }

        BookRepository.postBooks(postBooksRequest.build())
        .then(res => {
            dispatch(openBookList());
        })
        .catch(error => {
            setError(error.message)
        });
    }

    let displayPanel: JSX.Element | null= null;

    if (error || authorList.error || bookTypes.error || bookStatuses.error){
        displayPanel=(
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">                            
                            <common.Header
                                title="Add Book"
                                buttons={[
                                    (
                                        <button 
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            onClick={()=> dispatch(openBookList())}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </button>
                                    )
                                ]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">                            
                            <div className="alert alert-danger" role="alert">{error}</div>
                        </div>
                    </div>
            

                </div>
            </div>
        )
    } else if (!authorList.isLoaded || !bookTypes.isLoaded || !bookStatuses.isLoaded){
        displayPanel=( 
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only"/>
                </div>
            </div>
        );
    } else if (authorList.authors != null && bookTypes.bookTypes != null && bookStatuses.bookStatuses != null){

        let authorsItems: any[] = []
        for (let i = 0; i < authorList.authors.length; i++){
            authorsItems.push(<option value={authorList.authors[i].authorId}>{authorList.authors[i].name}</option>)
        }

        let bookTypesArray: JSX.Element[] = []
        for (let i = 0; i < bookTypes.bookTypes.length; i++){
            bookTypesArray.push(<option value={bookTypes.bookTypes[i].id}>{bookTypes.bookTypes[i].name}</option>)
        }

        let bookStatusesArray: JSX.Element[] = []
        for (let i = 0; i < bookStatuses.bookStatuses.length; i++){
            bookStatusesArray.push(<option value={bookStatuses.bookStatuses[i].statusId}>{bookStatuses.bookStatuses[i].statusName}</option>)
        }

        const initialValues: BookAddForm = {
            title: null, 
            authorId: null,
            statusId: null,
            lastChapter: null,
            bookTypeId: null,
            createDate: dateUtils.currentDateForInputZoned(),
            note: null,
            url: null
        }

        displayPanel=(
            <div className="row">
                <div className="col">
                <div className="row">
                        <div className="col">                            
                            <common.Header
                                title="Add Book"
                                buttons={[
                                    (
                                        <button 
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            onClick={()=> dispatch(openBookList())}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </button>
                                    )
                                ]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Formik 
                                initialValues={initialValues}
                                onSubmit={(values: BookAddForm, {setSubmitting, resetForm}) => {
                                    setSubmitting(true);
                                    saveValues(values);
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

                                            <Field 
                                                name="statusId"
                                            >
                                                {({
                                                    field,
                                                    meta
                                                })=>(    
                                                    <DivFormGroup controlId={field.name}>
                                                        <label>Status</label >
                                                        <select 
                                                            className="form-control" 
                                                            as="select"
                                                            name={field.name}
                                                                {...field}    
                                                        >   
                                                            <option value='' >Select status</option>
                                                            {bookStatusesArray}
                                                        </select>
                                                        {meta.touched && meta.error && (
                                                            <label className="text-danger">{meta.error}</label>
                                                        )}
                                                    </DivFormGroup>                                   
                                                )}
                                            </Field>

                                            <Field 
                                                name="lastChapter"
                                            >
                                                {({
                                                    field
                                                })=>(
                                                    <DivFormGroup controlId={field.name}>
                                                        <label>Last chapter</label>
                                                        <input
                                                            className="form-control" 
                                                            type="number" 
                                                            placeholder="Last chapter"
                                                            {...field}
                                                        />
                                                    </DivFormGroup> 
                                                )}
            
                                            </Field>

                                            <DivFormGroup controlId="createDate">
                                                <label>Create date UTC</label>
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

                                            <button className="btn btn-primary"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >Submit</button>
                                        </form>
                                    )
                                }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="row">
            <div className="col">
                {displayPanel}
            </div>
        </div>
    )

}
