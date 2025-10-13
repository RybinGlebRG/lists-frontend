import React from 'react';
import {openSignIn} from '../../redux/actionCreators';
import { connect } from 'react-redux';
import { Formik, Field} from 'formik';
import {openAuthorList} from '../books/booksSlice'
import { useSelector, useDispatch } from 'react-redux'

import useAuthorList from './useAuthorsList';

export default function AuthorAdd() {

    const dispatch = useDispatch();

    const {error, isLoaded, authors, addAuthor} = useAuthorList();

    let result;

	if (error){
        result=( <div class="alert alert-danger" role="alert">{error}</div>);
    } else if (!isLoaded){
        result=( 
            <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" role="status">
                    <span class="sr-only"/>
                </div>
            </div>
        );
    } else {
        result=(
            <Formik
                initialValues={{ 
                    name: null
                }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Name must be set';
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    addAuthor({
                        body: values, 
                        onExecute: () => dispatch(openAuthorList())
                    });
                    setSubmitting(false);
                }}
            >
            {({
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
                    {console.log(values)}
                    <Field 
                        name="name"
                        validate={value => {
                            let errorMessage;
                            if (!value) {
                                errorMessage = 'Name must be set';
                            }
                            return errorMessage;
                        }}
                    >
                        {({
                            field,
                            meta
                        })=>(                                        
                            <div class="mb-3">
                                <label for="nameInput" class="form-label">Name</label>
                                <input 
                                    id="nameInput"
                                    class="form-control" 
                                    type="text" 
                                    placeholder="Name"
                                    {...field}
                                />
                                {meta.error  && (
                                    <label className="text-danger">{meta.error}</label>
                                )}
                            </div>
                        )}
                    </Field>  

                    <button  
                        class="btn btn-primary"
                        type="submit"
                        disabled={isSubmitting}
                    >Submit</button>
                </form>
            )}
            </Formik>
        )
    }

    return (
        <div>
          {result}
        </div>
    )
}
