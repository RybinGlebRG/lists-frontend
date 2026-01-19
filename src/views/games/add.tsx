import { useDispatch } from 'react-redux'
import {useState} from 'react';
import { Field, Formik} from 'formik';

import Header from '../common/header'
import { openGamesList } from '../../dao/game/gamesSlice'
import * as dateUtils from '../../crosscut/utils/dateUtils'
import { addGame } from '../../dao/game/GamesRepository';
import DivFormGroup from '../common/DivFormGroup';
import TextArea from '../common/TextArea';

export default function GamesAdd(){
    const dispatch = useDispatch();
    const [error,setError] = useState(null);

    let header=(
        <div className="row">
                <div className="col">
                    <Header
                        title="Add game"
                        buttons={[
                            (
                                <button 
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={()=>{
                                        dispatch(openGamesList());
                                    }}
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
    )

    let createDateUTC = dateUtils.currentDate();

    let errorDisplay;

    if (error){
        errorDisplay=(
            <div className="alert alert-danger" role="alert">{error}</div>
        )
    }


    let form=(
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">                    
                        <Formik 
                            initialValues={{ 						 
                                title: null, 
                                createDateUTC: createDateUTC,
                                note: null
                            }}
                            validate={values => {
                                const errors: any = {};
                                if (!values.title) {
                                    errors.title = 'Title must be set';
                                }
                                return errors;
                            }}
                            onSubmit={(values, {setSubmitting, resetForm}) => {
                                setSubmitting(true);

                                addGame(values)
                                .then(() =>{
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
                                    <DivFormGroup controlId="title">
                                        <label>Title</label>
                                        <input className="form-control" 
                                            type="text" 
                                            placeholder="Title"
                                            name="title"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.title ?? ""}
                                        />
                                        {touched.title && errors.title ? (
                                        <label className="text-danger">
                                            {errors.title}
                                        </label>
                                        ): null}
                                    </DivFormGroup>
                                
                                    <DivFormGroup controlId="createDateUTC">
                                        <label>Create date UTC</label>
                                        <input className="form-control" 
                                            type="datetime-local" 
                                            name="createDateUTC"
                                            value={values.createDateUTC}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </DivFormGroup>     

                                    <Field 
                                        name="note"
                                    >
                                        {({
                                            field,
                                            meta
                                        })=>(    
                                            <DivFormGroup controlId="note">
                                                <label>Note</label>
                                                <TextArea
                                                    rows="3" 
                                                    field={field}                              
                                                />
                                            </DivFormGroup>                                     
                                        )}
                                    </Field>

                                    <button  
                                        className="btn btn-primary"
                                        type="submit"
                                        disabled={isSubmitting}
                                        aria-label="submit"
                                    >
                                        Submit
                                    </button>
                                    </form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {errorDisplay}
                    </div>
                </div>
            </div>
        </div>
    )
    
    return(
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        {header}
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        {form}
                    </div>
                </div>
            </div>
        </div>
    )
}