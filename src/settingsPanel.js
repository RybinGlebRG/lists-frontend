import React from 'react';
import './settingsPanel.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class SettingsPanel extends React.Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    changePassword(values){
        fetch(window.env.BACKEND_ADDR+"/api/v0.1/tokens",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "user": {
                    "id": this.props.user.id,
                    "name": this.props.user.name,
                    "password": values.current_password
                }
            })
        })
        .then(
            res => {
                if (!res.ok){
                    throw new Error('Error while getting token');
                }

                return res.json() ;
            }
        )
        .then(
            result => {

                return fetch(window.env.BACKEND_ADDR+"/api/v0.1/users/"+this.props.user.id,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': 'Bearer '+result.user.token
                    },
                    body: JSON.stringify({
                        "user": {
                            "id": this.props.user.id,
                            "name": this.props.user.name,
                            "password": values.new_password
                        }
                    })
                }
            );
            }
        )
        .then(
            res => {
                if (!res.ok){
                    throw new Error('Error while updating password');
                }

                alert("Password was changed successfully") ;
            })
        .catch((error) => {
            alert(error)
        }

        )
    }

    render(){

        return (
            <div
                id="div_settingsPanel"
            >
                <div
                    id="labelDiv_settingsPanel"
                >
                    <label
                        id="label_settingsPanel"
                    >
                        Change Password
                    </label>
                </div>

                <div id='loginDiv_settingsPanel'>
                <Formik
                    initialValues={{ 
                        current_password: '', 
                        new_password: '',
                        confirm_password: '',

                    }}
                    onSubmit={(values, {resetForm}) => {       
                        this.changePassword(values);
                        resetForm({});
                        
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.current_password) {
                        errors.current_password = 'Current password required';
                        }
                        if (!values.new_password){
                            errors.new_password = 'New password required';
                        }
                        if (!values.confirm_password){
                            errors.confirm_password = 'Confirm password required';
                        }

                        if (values.confirm_password !== values.new_password){
                            errors.different_passwords = "Passwords are different";
                        }
                        return errors;
                    }}
                >
                {({ initialValues, values, errors, resetForm, onSubmit }) => (
                <Form>
                    <div
                        id="formInternal_settingsPanel"
                    >

                    <div
                        className="lableDiv_settingsPanel"
                    >
                        <label
                            className="lableClass_settingsPanel"
                        >Current Password:</label>
                    </div>

                    <div
                        className="inputDiv_settingsPanel"
                    >
                        <Field 
                            name='current_password' 
                            value={values.current_password || ''}
                        >
                            {({
								field, // { name, value, onChange, onBlur }
								form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
								meta,
								}) => (
									<input 
                                        type="password"                                 
										{...field} 
										className={meta.error ? "inputClass_settingsPanel error" : "inputClass_settingsPanel"}
									/>
								)}
                        </Field>					
                    </div>


                    <div
                        className="lableDiv_settingsPanel"
                    >
                        <label
                            className="lableClass_settingsPanel"
                        >New Password:</label>
                    </div>

                    <div
                        className="inputDiv_settingsPanel"
                    >
                        <Field 
                            name='new_password' 
                            value={values.new_password || ''}
                            >
                            {({
								field, // { name, value, onChange, onBlur }
								form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
								meta,
								}) => (
									<input 
                                        type="password"                           
										{...field} 
										className={meta.error ? "inputClass_settingsPanel error" : "inputClass_settingsPanel"}
									/>
								)}
                        </Field>					
                    </div>


                    <div
                        className="lableDiv_settingsPanel"
                    >
                        <label
                            className="lableClass_settingsPanel"
                        >Confirm Password:</label>
                    </div>

                    <div
                        className="inputDiv_settingsPanel"
                    >
                        <Field 
                            name='confirm_password' 
                            value={values.confirm_password || ''}
                            >
                            {({
								field, // { name, value, onChange, onBlur }
								form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta
								}) => (
									<input 
                                        type="password" 
										{...field} 
										className={meta.error ? "inputClass_settingsPanel error" : "inputClass_settingsPanel"}
									/>
								)}
                        </Field>					
                    </div>


                    <div
                        className='warningLable_settingsPanel'
                    >
                        {errors.current_password === "Current password required" ?(
                            <label>Current password required</label>
                        ): null                      
                        }
                        
                    </div>

                    <div
                        className='warningLable_settingsPanel'
                    >
                        {errors.new_password === "New password required" ?(
                            <label>New password required</label>
                        ): null                      
                        }
                        
                    </div>  
                    <div
                        className='warningLable_settingsPanel'
                    >
                        {errors.confirm_password === "Confirm password required" ?(
                            <label>Confirm password required</label>
                        ): null                      
                        }
                        
                    </div> 
                    <div
                        className='warningLable_settingsPanel'
                    >
                        {errors.different_passwords=== "Passwords are different" && 
                        errors.new_password !== "New password required" && errors.confirm_password !== "Confirm password required"  ?(
                            <label>Passwords are different</label>
                        ): null                      
                        }
                        
                    </div> 

                    <div
                        className="buttonDiv_settingsPanel"
                    >
                        <button
                            type="submit"
                            className="button"
                        >
                        Submit
                        </button>
                    </div>
                    </div>
                </Form>
                )}

                </Formik>
                </div>
            </div>
        )
    }
}

export default SettingsPanel;