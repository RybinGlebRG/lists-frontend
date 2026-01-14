import React from 'react';
import { Field, Formik } from 'formik';
import { loginUser} from '../../redux/actionCreators.js'
import { connect } from 'react-redux'
import { setUser} from '../../dao/user/loginSlice'
import {openBookList} from '../../readList/books/booksSlice.js'
import {openCategory} from '../../displayAreaSlice.js'
import * as displayAreaCategories from '../../displayAreaCategories.js'
import DivFormGroup from '../common/DivFormGroup.jsx';
import { useDispatch } from 'react-redux';
import ButtonSubmit from '../common/ButtonSubmit.jsx';
import * as UserRepository from '../../dao/user/UserRepository'


interface LoginForm {
    login: string | null,
    password: string | null
}

export default function LoginPanel(): JSX.Element {

    const dispatch = useDispatch();


    function onLogin(values: LoginForm){
        if (values.login == null || values.password == null) {
            throw new Error();
        }

        UserRepository.getUser(values.login, values.password)
        .then(
            user=>{
                dispatch(setUser({user: user}))
                dispatch(loginUser(user.accessToken, values.login));
                dispatch(openBookList());
                dispatch(openCategory(displayAreaCategories.READ_LIST));
            }
        )
        .catch(
            error => {
				alert("Error: "+error);
        });

    }

    const initialValues: LoginForm = {
        login: null,
        password: null
    }

    return(
        <div className="row h-100 justify-content-center align-items-center">
            <div className="col-md-auto">
                <div className="row justify-content-center">
                    <div className="col-md-auto mb-2">
                        <h3>Sign in</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Formik 
                            initialValues={initialValues}
                            onSubmit={(values: LoginForm, {setSubmitting, resetForm}) => {
                                try {
                                    onLogin(values);
                                } catch (e) {
                                    alert((e as Error).message)
                                }
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
                                    <div className="mb-2">
                                        <Field
                                            name="login"
                                            validate={ (value: string | null) => {
                                                let errorMessage: string | null = null;
                                                if (!value) {
                                                    errorMessage = 'Login must be entered';
                                                }
                                                return errorMessage;
                                            }}
                                        >
                                            {({
                                                field,
                                                meta
                                            })=>(
                                                <DivFormGroup controlId="login">
                                                    <input 
                                                        class="form-control" 
                                                        type="text" 
                                                        placeholder="Login"
                                                        {...field}  
                                                    />
                                                    {meta.touched && meta.error && (
                                                        <label className="text-danger">{meta.error}</label>
                                                    )}
                                                </DivFormGroup> 
                                            )}
                                        </Field>
                                    </div>

                                    <div className="mb-2">   
                                        <Field
                                            name="password"
                                            validate={ (value: string | null) => {
                                                let errorMessage: string | null = null;
                                                if (!value) {
                                                    errorMessage = 'Password must be entered';
                                                }
                                                return errorMessage;
                                            }}
                                        >
                                            {({
                                                field,
                                                meta
                                            })=>(
                                                <DivFormGroup controlId="password">
                                                    <input 
                                                        class="form-control" 
                                                        type="password" 
                                                        placeholder="Password"
                                                        {...field}  
                                                    />
                                                    {meta.touched && meta.error && (
                                                        <label className="text-danger">{meta.error}</label>
                                                    )}
                                                </DivFormGroup> 
                                            )}
                                        </Field>
                                    </div>     
    
                                    <div className="row justify-content-center">
                                        <div className="col-md-auto">
                                            {/* <button  className="btn btn-primary"
                                                variant="primary" 
                                                type="submit"
                                                disabled={isSubmitting}
                                            >Sign in</button> */}
                                            <ButtonSubmit
                                                variant="primary" 
                                                disabled={isSubmitting}
                                            >Sign in</ButtonSubmit>
                                        </div>
                                    </div>
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
