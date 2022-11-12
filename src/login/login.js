import React from 'react';
import { Formik } from 'formik';
import { Row, Col, ListGroup, Alert, Button, Form } from 'react-bootstrap';
import {openBookList, setJWT, loginUser} from '../redux/actionCreators.js'
import { connect } from 'react-redux'

class LoginPanel extends React.Component{
    
    onLogin(in_vals){
        // const temp = JSON.stringify(in_vals);
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
            // this.props.setJWT(result.user.token);
            // this.props.setUser(result.user)
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
            <Row className="d-flex h-100 flex-column">
                <Col className="d-flex justify-content-center align-items-center">
                    <Row className="d-flex  justify-content-center align-items-stretch">
                        <Col md="auto">
                            <Row className="justify-content-center">
                                <Col md="auto">
                                    <h3>Sign in</h3>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col md="auto">
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
                                        onSubmit={(values) => {
                                            this.onLogin(values)
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
                                            <Form
                                                onSubmit={handleSubmit}
                                            >
                                                <Form.Group controlId="login">
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Login"
                                                        name="login"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.login}
                                                    />
                                                    {touched.login && errors.login ? (
                                                    <Form.Text className="text-danger">
                                                        {errors.login}
                                                    </Form.Text>
                                                    ): null}
                                                </Form.Group>
                                                <Form.Group controlId="password">
                                                    <Form.Control 
                                                        type="password" 
                                                        name="password"
                                                        placeholder="Password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.password}
                                                    />
                                                    {touched.password && errors.password ? (
                                                    <Form.Text className="text-danger">
                                                        {errors.password}
                                                    </Form.Text>
                                                    ): null}
                                                </Form.Group>
                                                <Row className="justify-content-center">
                                                    <Col md="auto">
                                                        <Button 
                                                            variant="primary" 
                                                            type="submit"
                                                            disabled={isSubmitting}
                                                        >Sign in</Button>
                                                    </Col>
                                                </Row>
                                                </Form>
                                                    
                                            )
                                        }
                                    </Formik>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

// export default LoginPanel;
export default connect(
	null,
	{ openBookList, setJWT, loginUser }
  )(LoginPanel)