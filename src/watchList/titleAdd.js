import React from 'react';
import { Row, Col, ListGroup, Alert, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Formik} from 'formik';
import {titleAddSetResult, openTitlesList} from '../redux/actionCreators';


class TitleAdd extends React.Component{
    constructor(props){
		super(props);
		this.state={
			error: null
        };
    }

    getCurrentTime(){
		// const timeElapsed = Date.now();
		let today = new Date(Date.now());
        // today = new Date(timeElapsed);
		//let today = new Date(timeElapsed);
		//  today = today.substring(0,today.length-1);
		// today = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
		today = today.getUTCFullYear() + '-' +
				(today.getUTCMonth()+1).toString().padStart(2,"0") + '-' +
				today.getUTCDate().toString().padStart(2,"0") + 'T' +
				today.getUTCHours().toString().padStart(2,"0") + ':' +
				today.getUTCMinutes().toString().padStart(2,"0");
		return today;
    }
    
    saveValues(values){
        let dt = new Date(values.createDate+"Z")
        dt = dt.toISOString()
        let tmp = {
            name: values.name,
            statusId: values.status,
            createDateUTC: values.createDate,
            videoType: {
                typeId: values.type
            }
        }
        fetch(
			window.location.origin+`/api/v0.2/watchLists/${this.props.store.watchListId}/titles`,
			{
				method: "POST",
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'Authorization': `Bearer ${this.props.store.JWT}`
				},
				body: JSON.stringify(tmp)
			}
		)
		.then(
            res => {
                // this.props.titleAddSetResult(true,null);
                if (!res.ok){
					throw new Error('Some network error');
				};
                this.props.openTitlesList();
            }
        )
        .catch(
            err => {
                this.setState({
					error:err.message
				});
                // this.props.titleAddSetResult(false,error);
        });
    }
    
    render(){
        let alert;
        if (this.state.error){
            alert=(
                <div class="alert alert-danger" role="alert">{this.state.error}</div>
            )
        }
        return(
            <Row>
                <Col>
                    <Row>
                        <Col bsPrefix="col pb-2 mt-4 mb-2 border-bottom">
                            <h3>Add title</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Formik 
                                initialValues={{ 						 
                                    createDate: this.getCurrentTime(),
                                    name: null,
                                    status:0,
                                    type:0
                                }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.name) {
                                        errors.name = 'Name must be set';
                                    }
                                    if (!values.status) {
                                        errors.status = 'Status must be set';
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting, resetForm}) => {
                                    setSubmitting(true);
                                    this.saveValues(values);
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
                                    <Form
                                        onSubmit={handleSubmit}
                                    >
                                        {/* {console.log(values)} */}
                                        <Form.Group controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Name"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            {touched.name && errors.name ? (
                                            <Form.Text className="text-danger">
                                                {errors.name}
                                            </Form.Text>
                                            ): null}
                                        </Form.Group>
                                        <div class="form-group" controlId="status">
                                            <label>Status</label >
                                            <select class="form-control" 
                                                as="select"
                                                name="status"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.status}      
                                            >   
                                                <option value='' >Select status</option>
                                                <option value="1">In progress</option>
                                                <option value="2">Completed</option>
                                            </select>
                                            {touched.status && errors.status ? (
                                            <Form.Text className="text-danger">
                                                {errors.status}
                                            </Form.Text>
                                            ): null}
                                        </div>
                                        <div class="form-group" controlId="type">
                                            <label>Type</label >
                                            <select class="form-control" 
                                                as="select"
                                                name="type"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.type}      
                                            >
                                                <option value="0">TV</option>
                                                <option value="1">Movie</option>
                                                <option value="2">OVA</option>
                                                <option value="3">Special</option>
                                            </select>
                                        </div>
                                        {/* <Form.Group controlId="createDate">
                                            <Form.Label>Create Date</Form.Label>
                                            <Form.Control 
                                                type="datetime-local" 
                                                name="createDate"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.createDate}
                                            />
                                        </Form.Group> */}
                                        <div class="form-group" controlId="createDate">
                                            <label>Create date UTC</label>
                                            <input class="form-control" 
                                                type="datetime-local" 
                                                name="createDate"
                                                value={values.createDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <Button 
                                            variant="primary" 
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                        </Button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            {alert}
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

}


const mapStatetoProps = (state) => {
	return {
		store: {
			JWT: state.listsReducer.JWT,
			watchListId: state.listsReducer.watchListId,
			ok: state.listsReducer.titleAdd.ok,
			error: state.listsReducer.titleAdd.error
		}
	};
}

export default connect(
    mapStatetoProps,
    {
        titleAddSetResult,
        openTitlesList
    }
)(TitleAdd)