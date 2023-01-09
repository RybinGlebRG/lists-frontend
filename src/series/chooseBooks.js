import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Formik} from 'formik';
import {
    openSeriesItem
} from './seriesSlice'

export default function ChooseBooks(props) {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [books,setBooks] = useState(null);
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        listId: useSelector(state=>state.listsReducer.listId),
        seriesId: useSelector(state=>state.listsReducer.seriesItem.seriesId)
    }
    const bookOrdering= "DESC";

    useEffect(()=>{
        const loadData = async ()=>{
            let body={
                    sort:[{
                        field:"createDate",
                        ordering: bookOrdering
                    }]
                }
    
    
            let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${store.listId}/books/search`,
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${store.JWT}`,
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(body)
            });
            if (!res.ok){
                let result=await res.json();
                throw new Error('Error: '+result.errorMessage);
            };
            let bookList = await res.json();	
            return bookList;
        
        }

        loadData()
		.then(res=>{
            setBooks(res.items);
            setError(null);
            setIsLoaded(true);     
		})
		.catch(err=>{
            setError(err.message);
            setIsLoaded(true);
		});


    },[store.listId])

    let display;

    if (!isLoaded){
        display=( 
            <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" role="status">
                    <span class="sr-only"/>
                </div>
            </div>);
    } else if (error){
        display=( <div class="alert alert-danger" role="alert">{error}</div>);
    } else {
        let header = (
            <div>
                <div class="mb-4 mt-4 border-bottom">
                    <div class="row">
                        <div class="col">
                            <div class="pb-0 mt-3 mb-2 ">
                                <h2>(Add books)</h2>
                            </div>
                        </div>
                        <div class="col-md-auto">
                            <button 
                                type="button"
                                class="btn btn-secondary btn-sm"
                                onClick={()=>{
                                    dispatch(openSeriesItem());
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                    <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>            
            </div>
        );

        let items = books.map((item) =>{
            return (
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id={item.bookId}/>
                    <label class="form-check-label" for={item.bookId}>
                    {item.title}
                    </label>
                </div>
            )
             
        });
        display=(
            <div class="row">
                <div class="col">              
                    <div class="row">
                        <div class="col">
                            {header}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">                
                            <Formik 
                                initialValues={{ 						 
                                    title: null, 
                                    author: null,
                                    status: null,
                                    series: null,
                                    order: null,
                                    lastChapter: null,
                                    bookType: null
                                }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.title) {
                                        errors.title = 'Title must be set';
                                    }
                                    if ((values.series && !values.order) || (values.order && !values.series)) {
                                        errors.series = 'Series and Order must be set together';
                                        errors.order = 'Series and Order must be set together';
                                    }
                                    if (!values.status){
                                        errors.status = 'Status must be set';
                                    }
                    
                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting, resetForm}) => {
                                    setSubmitting(true);
                                    this.saveVals(values);
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
                                            {items}
                                            {/* <button  class="btn btn-primary"
                                                variant="primary" 
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Submit
                                            </button> */}
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

    return (
        <div>{display}</div>
    )

}