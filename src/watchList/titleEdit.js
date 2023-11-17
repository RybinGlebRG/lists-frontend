import React from 'react';
import { Row, Col, Button, Alert} from 'react-bootstrap'
import { connect } from 'react-redux'
import {openTitle} from '../redux/actionCreators';
import { Formik} from 'formik';
import * as dateUtils from '../utils/dateUtils'

class TitleEdit extends React.Component{
    constructor(props){
		super(props);
		this.state={
            isLoaded: false,
			error: null,
			data: null
        }
    }

    loadTitle(){
        this.setState({
			isLoaded:false,
			error:null
		});
		fetch(window.location.origin+`/api/v0.2/watchLists/${this.props.store.watchListId}/titles/${this.props.store.titleId}`,
		{
			method: "GET",
			headers: {
				'Authorization': `Bearer ${this.props.store.JWT}`
			}
        })
        .then(
            res => {
                if (!res.ok){
                    throw new Error('Some network error');
                }
                return res.json();
            })
        .then(
            res => {
				this.setState({
					isLoaded:true,
					error:null,
					data: res
				});
            }
        )
        .catch(
            error => {
				this.setState({
					isLoaded:true,
					error:error.message,
					data: null
				});
        });
    }

    saveValues(values){
        // let dt = new Date(values.createDate+"Z")
        // dt = dt.toISOString()
        let dt = dateUtils.postprocessValues(values.createDate);
        let title = {
            name: values.name,
            statusId: values.status,
            createDateUTC: dt,
            videoType: {
                typeId: values.type
            }
        }


        fetch(
			window.location.origin+`/api/v0.2/watchLists/${this.props.store.watchListId}/titles/${this.props.store.titleId}`,
			{
				method: "PUT",
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'Authorization': `Bearer ${this.props.store.JWT}`
				},
				body: JSON.stringify(title)
			}
		)
		.then(
            res => {
                // this.props.titleAddSetResult(true,null);
                // this.props.openBookV2(this.props.store.bookId);
                if (!res.ok){
					throw new Error('Some network error');
				};
                this.props.openTitle(this.state.data.id);
            }
        )
        .catch(
            error => {
                alert(error)
        });
    }

    componentDidMount(){
		this.loadTitle();
	}

    render(){
        let displayPanel;

		if (this.state.error){
			displayPanel=( 
				<Alert variant='danger'>{this.state.error}</Alert>
			);
		} else if (!this.state.isLoaded) {
			displayPanel=( 
				<div class="d-flex justify-content-center">
					<div class="spinner-border m-5" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			);
		} else {
            // let createDate=this.state.data.create_date_utc;
            // createDate = createDate+".000Z";
            // createDate = new Date(createDate);
            // // createDate = createDate.toISOString();
            // createDate = createDate.getUTCFullYear() + '-' +
			// 	(createDate.getUTCMonth()+1).toString().padStart(2,"0") + '-' +
			// 	createDate.getUTCDate().toString().padStart(2,"0") + 'T' +
			// 	createDate.getUTCHours().toString().padStart(2,"0") + ':' +
			// 	createDate.getUTCMinutes().toString().padStart(2,"0");
            // // createDate = createDate.substring(0,createDate.length-1);
            let createDate = dateUtils.preprocessValues(this.state.data.create_date_utc)
			displayPanel=(	
				<Row>
                    <Col>
                        <Row>
                            <Col>
                                <Row>
                                    {/* <Col>
                                        <h3>{this.state.data.name}</h3>
                                    </Col> */}
                                    <div class="col pb-2 mt-4 mb-2 border-bottom">
                                        <h3>{this.state.data.name}</h3>
                                    </div>
                                    <div class="col-md-auto">
                                        <button 
                                            type="button"
                                            class="btn btn-secondary btn-sm"
                                                onClick={()=>{
                                                    this.props.openTitle(this.state.data.id);
                                                }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <div class="row">
                            <Formik
                                initialValues={{ 
                                    name: this.state.data.name, 
                                    createDateUTC: this.state.data.create_date_utc,
                                    status: this.state.data.statusId,
                                    type: this.state.data.videoType.typeId,
                                    createDate: createDate
                                }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.name) {
                                        errors.name = 'Name must be set';
                                    }
                                    if (!values.status){
                                        errors.status = 'Status must be set';
                                    }
                                    if (values.type === null){
                                        errors.type = 'Type must be set';
                                    }
                
                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting, resetForm}) => {
                                    setSubmitting(true);
                                    this.saveValues(values);
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
                                <div class="form-group" controlId="name">
                                    <label>Name</label>
                                    <input class="form-control" 
                                        type="text" 
                                        placeholder="Name"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    {touched.name && errors.name ? (
                                    <label className="text-danger">
                                        {errors.name}
                                    </label>
                                    ): null}
                                </div>
                                <div class="form-group" controlId="status">
                                    <label>Status</label >
                                    <select class="form-control" 
                                        as="select"
                                        name="status"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.status}      
                                    >
                                        <option value="1">In progress</option>
                                        <option value="2">Completed</option>
                                    </select>
                                    {touched.status && errors.status ? (
                                    <label className="text-danger">
                                        {errors.status}
                                    </label>
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
                                    {touched.type && errors.type ? (
                                    <label className="text-danger">
                                        {errors.type}
                                    </label>
                                    ): null}
                                </div>
                                {/* <div class="form-group" controlId="createDateUTC">
                                    <label>Create date UTC</label>
                                    <input class="form-control" 
                                        type="text" 
                                        disabled
                                        name="createDateUTC"
                                        placeholder={this.state.data.create_date_utc}
                                    />
                                </div> */}
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
                                
                                <button  class="btn btn-primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                                </form>
                            )}
                            </Formik>                        
                        </div>
                    </Col>
                </Row>
			);
		}

        return(
            <Row>
                <Col>
                    {displayPanel}
                </Col>
            </Row>
            
        )
    }
}

const mapStatetoProps = (state) => {
	return {
		store: {
			titleId: state.listsReducer.title.titleId,
            JWT: state.listsReducer.JWT,
			watchListId: state.listsReducer.watchListId
		}
	};
}

export default connect(
    mapStatetoProps,
    {
        openTitle
    }
)(TitleEdit)