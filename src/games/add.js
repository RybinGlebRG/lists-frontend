import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import { Formik} from 'formik';

import Header from '../common/header'
import { openGamesList } from './gamesSlice'
import * as dateUtils from '../utils/dateUtils'
import { addGame } from './gamesApi';
import {openSignIn} from '../redux/actionCreators'

export default function GamesAdd(){
    const dispatch = useDispatch();
    const [error,setError] = useState(null);
    let store={
        JWT: useSelector(state=>state.listsReducer.JWT)
        // TODO: Add userId
    }

    let header=(
        <div class="row">
                <div class="col">
                    <Header
                        title="Add game"
                        buttons={[
                            (
                                <button 
                                    type="button"
                                    class="btn btn-secondary btn-sm"
                                    onClick={()=>{
                                        dispatch(openGamesList());
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
            </div>
    )

    let createDateUTC = dateUtils.currentDate();

    let errorDisplay;

    if (error){
        errorDisplay=(
            <div class="alert alert-danger" role="alert">{error}</div>
        )
    }


    let form=(
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">                    
                        <Formik 
                            initialValues={{ 						 
                                title: null, 
                                createDateUTC: createDateUTC
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.title) {
                                    errors.title = 'Title must be set';
                                }
                                return errors;
                            }}
                            onSubmit={(values, {setSubmitting, resetForm}) => {
                                setSubmitting(true);
                                
                                let promises=[];
                                promises.push(addGame(store.JWT, values, 1, ()=>{dispatch(openSignIn())}));
                        
                                Promise.all(promises)
                                .then(([addGame]) =>{
                                    setError(null);  
                                    dispatch(openGamesList());
                                })
                                .catch(err=>{
                                    setError(err.message);
                                });                    
                                
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
                                
                                    <div class="form-group" controlId="createDate">
                                        <label>Create date UTC</label>
                                        <input class="form-control" 
                                            type="datetime-local" 
                                            name="createDate"
                                            value={values.createDateUTC}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
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
                <div class="row">
                    <div class="col">
                        {errorDisplay}
                    </div>
                </div>
            </div>
        </div>
    )
    
    return(
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        {header}
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        {form}
                    </div>
                </div>
            </div>
        </div>
    )
}