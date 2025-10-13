import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import useTags from './useTags';
import Header from '../../common/header'
import { Formik, Field} from 'formik';
import {openTags} from '../../readList/books/booksSlice'

export default function TagsAdd() {
    const dispatch = useDispatch();

    const {error, isLoaded, data, addTag} = useTags();

    let result;

    function handleSaveValue(values){
        let body = {
            name: values.name
        }

        addTag({
            body: body, 
            onUpdate: () => dispatch(openTags())
        })
    }

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

                <Field name="name">
                    {({
                        field,
                        meta
                    })=>(
                        <div class="form-group" controlId="name">
                            <label>Name</label>
                            <input 
                                class="form-control" 
                                type="text" 
                                placeholder="Tag Name"
                                {...field}  
                            />
                            {meta.touched && meta.error && (
                            <div className="error">{meta.error}</div>
                            )}
                        </div> 
                    )}
                </Field>

                <button  class="btn btn-primary mt-4"
                    type="submit"
                    disabled={isSubmitting}
                >Submit</button>
                </form>
            )}
            </Formik>
        )
    }

    return(
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <Header
                                title="Add tag"
                                buttons={[]}
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            {result}
                        </div>
                    </div>
                </div>
            </div>
        );

}
