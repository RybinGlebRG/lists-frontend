import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Formik, useField} from 'formik';
import {
    openSeriesItem
} from './seriesSlice'
import  {
    loadSeriesItem
} from './api'


async function loadBooks(JWT, listId, bookOrdering){
    let body={
        sort:[{
            field:"createDate",
            ordering: bookOrdering
        }]
    }


    let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${listId}/books/search`,
    {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${JWT}`,
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

export default function ChooseBooks(props) {
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [books,setBooks] = useState(null);
    const [series,setSeries] = useState(null);
    const [bookOrdering,setBookOrdering] = useState("DESC");
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT),
        listId: useSelector(state=>state.listsReducer.listId),
        seriesId: useSelector(state=>state.listsReducer.seriesItem.seriesId)
    }

    useEffect(()=>{
        let promises=[];
        promises.push(loadBooks(store.JWT, store.listId, bookOrdering));
        promises.push(loadSeriesItem(store.JWT, store.listId, store.seriesId));

        Promise.all(promises)
        .then(([books, series]) =>{
            setBooks(books.items);
            setSeries(series.series)
            setError(null);
            setIsLoaded(true);   
        })
		.catch(err=>{
            setError(err.message);
            setIsLoaded(true);
		});


    },[])

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
                                <h2>(Choose books)</h2>
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

        let checked = series.items.map((item)=>{
            return String(item.bookId);
        })



        let items = books.map((item) =>{
            const CheckField = ()=>{
                const [field] = useField({ name: "checkValue", type: "checkbox", value: String(item.bookId) });
                return (
                    <div class="form-check">
                        <input {...field} class="form-check-input" type="checkbox" id={item.bookId}/>
                        <label class="form-check-label" for={item.bookId}>{item.title}</label>
                    </div>
                )
            }            
             return (
                <CheckField/>
             );
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
                                    checkValue: checked
                                }}
                                validate={values => {
                                    const errors = {};                    
                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting, resetForm}) => {
                                    setSubmitting(true);
                                    console.log(values)
                                    // this.saveVals(values);
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
                                            <button  class="btn btn-primary"
                                                variant="primary" 
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Submit
                                            </button>
                                            {items}
                                            
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