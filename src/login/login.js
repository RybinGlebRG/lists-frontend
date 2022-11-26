import React from 'react';
import { Formik } from 'formik';
import {openBookList, loginUser} from '../redux/actionCreators.js'
import { connect } from 'react-redux'

class LoginPanel extends React.Component{
    
    onLogin(in_vals){
        const vals={
            "username": in_vals.login,
            "password": in_vals.password
        }
        fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/users/tokens`,
			{
				method: "POST",
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(vals)
			}
		)
        .then(res => {
            if (!res.ok){
                throw new Error('Some network error');
            }
            return res.json();
        })
        .then(
            result=>{
            this.props.loginUser(result.token, in_vals.login);
            this.props.openBookList();
            
            }
        )
        .catch(
            error => {
				alert("Error: "+error);
        });

    }
    
    
    render(){
        return(
                    <div class="row h-100 justify-content-center align-items-center">
                        <div class="col-md-auto">
                            <div class="row justify-content-center">
                                <div class="col-md-auto mb-2">
                                    <h3>Sign in</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <Formik 
                                        initialValues={{ 						 
                                            login: null,
                                            password: null
                                        }}
                                        validate={values => {
                                            const errors = {};
                                            if (!values.login) {
                                                errors.login = 'Login must be entered';
                                            }
                                            if (!values.password) {
                                                errors.password = 'Password must be entered';
                                            }

                                            return errors;
                                        }}
                                        onSubmit={(values, {setSubmitting, resetForm}) => {
                                            setSubmitting(true);
                                            this.onLogin(values)
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
                                                <div class="mb-2">
                                                    <div class="form-group" controlId="login">
                                                        <input class="form-control" 
                                                            type="text" 
                                                            placeholder="Login"
                                                            name="login"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.login}
                                                        />
                                                        {touched.login && errors.login ? (
                                                        <label className="text-danger">
                                                            {errors.login}
                                                        </label>
                                                        ): null}
                                                    </div>
                                                </div>
                                                <div class="mb-2">
                                                    <div class="form-group" controlId="password">
                                                        <input class="form-control"
                                                            type="password" 
                                                            name="password"
                                                            placeholder="Password"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.password}
                                                        />
                                                        {touched.password && errors.password ? (
                                                        <label className="text-danger">
                                                            {errors.password}
                                                        </label>
                                                        ): null}
                                                    </div> 
                                                </div>       
                                                <div class="row justify-content-center">
                                                    <div class="col-md-auto">
                                                        <button  class="btn btn-primary"
                                                            variant="primary" 
                                                            type="submit"
                                                            disabled={isSubmitting}
                                                        >Sign in</button>
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
}

// export default LoginPanel;
export default connect(
	null,
	{ openBookList, loginUser }
  )(LoginPanel)