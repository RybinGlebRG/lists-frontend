import React from 'react';
import { connect } from 'react-redux';
import { Formik} from 'formik';
import {openBookList, openSignIn} from '../../redux/actionCreators';
import * as bookApi from './bookApi'
import * as common from '../../common/common'
import * as dateUtils from '../../utils/dateUtils'

class BookAdd extends React.Component{
	constructor(props){
		super(props);
		this.state={
			error: null,
            authors:null,
            series: null,
            isLoaded: false,
            bookTypes: null,
            bookStatuses: null
        };

    }

    async loadData(){
        let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.readListId}/authors`,
		{
			method: "GET",
			headers: {
				'Authorization': `Bearer ${this.props.store.JWT}`
			}
        });
        let result;
        if (!res.ok){
            result=await res.json();
            throw new Error('Error: '+result.error);
        };

        let authors = await res.json();

        res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.readListId}/series`,
		{
			method: "GET",
			headers: {
				'Authorization': `Bearer ${this.props.store.JWT}`
			}
        });
        if (!res.ok){
            result=await res.json();
            throw new Error('Error: '+result.error);
        };

        let series = await res.json()

        let bookTypes = await bookApi.getBookTypes(this.props.store.JWT,()=>{this.props.openSignIn()})
        let bookStatuses = await bookApi.getBookStatuses(this.props.store.JWT,()=>{this.props.openSignIn()})

        let out = {
            authors: authors.items,
            series: series.items,
            bookTypes: bookTypes.items,
            bookStatuses: bookStatuses.items
        }


        return out;       
    }

    load(){
        this.loadData()
        .then(result =>{
            this.setState({
                authors: result.authors,
                series: result.series,
                isLoaded: true,
                bookTypes: result.bookTypes,
                bookStatuses: result.bookStatuses
            });  
        })
        .catch(
            error => {
                this.setState({
                    error: error.message,
                    isLoaded: true
                });
        });
    }

    componentDidMount(){
		this.load();
	}

	saveValues(values){
        let book = {
            readListId: this.props.store.readListId,
            title: values.title,
            status: values.status, 
            insertDate: values.createDate       
        }

        if (values.authors != null && values.author != ""){
            book.authorId = values.author;
        }

        // if (values.series != null && values.series != ""){
        //     book.seriesId = values.series;
        //     book.order = values.order;
        // }

        if (values.lastChapter != null && values.lastChapter != ""){
            book.lastChapter = values.lastChapter;
        }

        if (values.bookType != null && values.bookType != ""){
            book.bookTypeId = values.bookType;
        }

        fetch(
			window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.readListId}/books`,
			{
				method: "POST",
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'Authorization': `Bearer ${this.props.store.JWT}`
				},
				body: JSON.stringify(book)
			}
		)
		.then(
            res => {
                // this.props.titleAddSetResult(true,null);
                if (!res.ok){
					throw new Error('Some network error');
				};
                this.props.openBookList();
            }
        )
        .catch(
            err => {
                this.setState({
					error:err.error
				});
                // this.props.titleAddSetResult(false,error);
        });
    }

    


	render(){
        let alert;
        let displayPanel;

        if (this.state.error){
            displayPanel=(
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col">                            
                                <common.Header
                                    title="Add Book"
                                    buttons={[
                                        (
                                            <button 
                                                type="button"
                                                class="btn btn-secondary btn-sm"
                                                onClick={()=>{
                                                    this.props.openBookList();
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
                        <div class="row">
                            <div class="col">                            
                                <div class="alert alert-danger" role="alert">{this.state.error}</div>
                            </div>
                        </div>
                

                    </div>
                </div>
            )
        } else if (!this.state.isLoaded){
            displayPanel=( 
				<div class="d-flex justify-content-center">
					<div class="spinner-border m-5" role="status">
						<span class="sr-only"/>
					</div>
				</div>
			);
        } else {
            let authorsItems=[]
            for (let i = 0; i < this.state.authors.length; i++){
                // authorsItems.push(<option key={i} value={i}>{i}</option>)
                authorsItems.push(<option value={this.state.authors[i].authorId}>{this.state.authors[i].name}</option>)
            }
    
            let seriesItems=[]
            for (let i = 0; i < this.state.series.length; i++){
                seriesItems.push(<option value={this.state.series[i].seriesId}>{this.state.series[i].title}</option>)
            }

            let bookTypes=[]
            for (let i = 0; i < this.state.bookTypes.length; i++){
                bookTypes.push(<option value={this.state.bookTypes[i].id}>{this.state.bookTypes[i].name}</option>)
            }

            let bookStatuses=[]
            for (let i = 0; i < this.state.bookStatuses.length; i++){
                bookStatuses.push(<option value={this.state.bookStatuses[i].statusId}>{this.state.bookStatuses[i].statusName}</option>)
            }

            let createDate = dateUtils.currentDate();

            displayPanel=(
                <div class="row">
                    <div class="col">
                    <div class="row">
                            <div class="col">                            
                                <common.Header
                                    title="Add Book"
                                    buttons={[
                                        (
                                            <button 
                                                type="button"
                                                class="btn btn-secondary btn-sm"
                                                onClick={()=>{
                                                    this.props.openBookList();
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
                        <div class="row">
                            <div class="col">
                                <Formik 
                                    initialValues={{ 						 
                                        title: null, 
                                        author: null,
                                        status: null,
                                        // series: null,
                                        // order: null,
                                        lastChapter: null,
                                        bookType: null,
                                        createDate: createDate
                                    }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.title) {
                                            errors.title = 'Title must be set';
                                        }
                                        // if ((values.series && !values.order) || (values.order && !values.series)) {
                                        //     errors.series = 'Series and Order must be set together';
                                        //     errors.order = 'Series and Order must be set together';
                                        // }
                                        if (!values.status){
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
                                        <form
                                            onSubmit={handleSubmit}
                                        >
                                            {/* {console.log(values)} */}
                                            <div class="form-group" controlId="title">
                                                <label>Title</label>
                                                <input class="form-control" 
                                                    type="text" 
                                                    placeholder="Title"
                                                    name="title"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                />
                                                {touched.title && errors.title ? (
                                                <label className="text-danger">
                                                    {errors.title}
                                                </label>
                                                ): null}
                                            </div>
                                            <div class="form-group" controlId="author">
                                                <label>Author</label >
                                                <select class="form-control" 
                                                    as="select"
                                                    name="author"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.author}      
                                                >   
                                                    <option value="" >--</option>
                                                    {authorsItems}
                                                </select>
                                            </div>
                                            {/* <div class="form-group" controlId="status">
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
                                                <label className="text-danger">
                                                    {errors.status}
                                                </label>
                                                ): null}
                                            </div> */}
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
                                                    {bookStatuses}
                                                </select>
                                                {touched.status && errors.status ? (
                                                <label className="text-danger">
                                                    {errors.status}
                                                </label>
                                                ): null}
                                            </div>
                                            {/* <div class="form-group" controlId="series">
                                                <label>Series</label >
                                                <select class="form-control" 
                                                    as="select"
                                                    name="series"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.series}      
                                                >
                                                    <option value="" >--</option>
                                                    {seriesItems}
                                                </select>
                                            </div>
                                            <div class="form-group" controlId="order">
                                                <label>Order</label>
                                                <input class="form-control" 
                                                    type="text" 
                                                    placeholder="Order"
                                                    name="order"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.order}
                                                />
                                                {touched.order && errors.order ? (
                                                <label className="text-danger">
                                                    {errors.order}
                                                </label>
                                                ): null}
                                            </div> */}
                                            <div class="form-group" controlId="lastChapter">
                                                <label>Last chapter</label>
                                                <input class="form-control" 
                                                    type="number" 
                                                    placeholder="Last chapter"
                                                    name="lastChapter"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.lastChapter}
                                                />
                                            </div>
                                            <div class="form-group" controlId="bookType">
                                                <label>Book Type</label >
                                                <select class="form-control" 
                                                    as="select"
                                                    name="bookType"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.bookType}      
                                                >   
                                                    <option value='' >--</option>
                                                    {/* <option value="1">Book</option>
                                                    <option value="2">Light Novel</option>
                                                    <option value="3">Webtoon</option> */}
                                                    {bookTypes}
                                                </select>
                                            </div>

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
                                {alert}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        
        return(
            <div class="row">
                <div class="col">
                    {displayPanel}
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
	return {
		store: {
			JWT: state.listsReducer.JWT,
			readListId: state.listsReducer.listId
		}
	};
}

export default connect(
    mapStatetoProps,
    {
        openBookList,
        openSignIn
    }
)(BookAdd)