import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, Alert, Button, Form } from 'react-bootstrap';
import { openBookV2, titleAddSetResult, saveBookEdit } from '../../redux/actionCreators'
import { Formik} from 'formik';
import * as dateUtils from '../../utils/dateUtils'
import * as bookApi from './bookApi'


class BookEdit extends React.Component{
    constructor(props){
		super(props);
		this.state={
            authors:null,
            // series: null,
            bookTypes: null,
            bookStatuses: null
        };

    }

    async loadData(){
        let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.listId}/books/${this.props.store.bookId}`,
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
        let book = await res.json();

        res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.listId}/authors`,
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

        let authors = await res.json();

        // res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.listId}/series`,
		// {
		// 	method: "GET",
		// 	headers: {
		// 		'Authorization': `Bearer ${this.props.store.JWT}`
		// 	}
        // });
        // if (!res.ok){
        //     result=await res.json();
        //     throw new Error('Error: '+result.error);
        // };

        // let series = await res.json()

        // let bookTypes = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/bookTypes`,
		// {
		// 	method: "GET",
		// 	headers: {
		// 		'Authorization': `Bearer ${this.props.store.JWT}`
		// 	}
        // });
        // if (!bookTypes.ok){
        //     bookTypes = await bookTypes.json();
        //     throw new Error('Error: '+bookTypes.error);
        // }
        // bookTypes = await bookTypes.json();
        let bookTypes = await bookApi.getBookTypes(this.props.store.JWT,()=>{this.props.openSignIn()})
        let bookStatuses = await bookApi.getBookStatuses(this.props.store.JWT,()=>{this.props.openSignIn()})

        let out = {
            book,
            authors: authors.items,
            // series: series.items,
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
                // series: result.series,
                bookTypes: result.bookTypes,
                bookStatuses: result.bookStatuses
            });
            this.props.saveBookEdit(true,null,result.book);  
        })
        .catch(
            error => {
            this.props.saveBookEdit(true,error.error,null)
        });
    }

    saveValues(values){
        // let dt = new Date(values.createDate+"Z")
        // dt = dt.toISOString()
        let dt = dateUtils.postprocessValues(values.createDate);
        let book = {
            readListId: this.props.store.listId,
            title: values.title,
            status: values.status,
            lastChapter: values.lastChapter,
            insertDateUTC: dt //this.props.store.book.insertDate
        }

        if (values.author != ""){
            book.authorId = values.author;
        }

        // if (values.series != ""){
        //     book.seriesId = values.series;
        //     book.order = values.order;
        // }

        if (values.bookType != null && values.bookType != ""){
            book.bookTypeId = values.bookType;
        }


        fetch(
			window.env.BACKEND_ADDR_V2+`/api/v0.2/books/${this.props.store.bookId}`,
			{
				method: "PUT",
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'Authorization': `Bearer ${this.props.store.JWT}`
				},
				body: JSON.stringify(book)
			}
		)
		.then(
            res => {
                this.props.titleAddSetResult(true,null);
                this.props.saveBookEdit(false,null,null)
                this.props.openBookV2(this.props.store.bookId);
            }
        )
        .catch(
            error => {
                this.props.titleAddSetResult(false,error);
                alert(error);
        });
    }

    componentDidMount(){
		if (!this.props.store.isLoaded){
            this.load();
        }
	}

    render(){

        let displayPanel;

        if (this.props.store.error){
            displayPanel=( 
				<Alert variant='danger'>{this.props.store.error.message}</Alert>
			);
        } else if (!this.props.store.isLoaded){
            displayPanel=( 
				<div class="d-flex justify-content-center">
					<div class="spinner-border m-5" role="status">
						<span class="sr-only"/>
					</div>
				</div>
			);
        } else {
            let createDate = dateUtils.preprocessValues(this.props.store.book.insertDate)

            let authorsItems=[]
            for (let i = 0; i < this.state.authors.length; i++){
                // authorsItems.push(<option key={i} value={i}>{i}</option>)
                authorsItems.push(<option value={this.state.authors[i].authorId}>{this.state.authors[i].name}</option>)
            }

            // let seriesItems=[]
            // for (let i = 0; i < this.state.series.length; i++){
            //     seriesItems.push(<option value={this.state.series[i].seriesId}>{this.state.series[i].title}</option>)
            // }

            let bookTypes=[]
            for (let i = 0; i < this.state.bookTypes.length; i++){
                bookTypes.push(<option value={this.state.bookTypes[i].id}>{this.state.bookTypes[i].name}</option>)
            }

            let bookStatuses=[]
            for (let i = 0; i < this.state.bookStatuses.length; i++){
                bookStatuses.push(<option value={this.state.bookStatuses[i].statusId}>{this.state.bookStatuses[i].statusName}</option>)
            }


            displayPanel=(
                <Row>
                <Col>
                    <Row>
                        {/* <Col bsPrefix="col pb-2 mt-4 mb-2 border-bottom">
                            <h3>{this.props.store.title}</h3>
                        </Col> */}
                        <div class="col pb-2 mt-4 mb-2 border-bottom">
                                <h3>{this.props.store.book.title}</h3>
                        </div>
                        <div class="col-md-auto">
                            <button
                                type="button"
                                class="btn btn-secondary btn-sm"
                                onClick={()=>{
                                    this.props.openBookV2(this.props.store.book.bookId);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                    <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                </svg>
                            </button>
                        </div>
                    </Row>
                    <Row>
                        <Col>
                        <Formik
                            initialValues={{ 
                                title: this.props.store.book.title, 
                                author: this.props.store.book.authors.length > 0 ? this.props.store.book.authors[0].authorId: null,
                                status: this.props.store.book.bookStatus.statusId,
                                // series: this.props.store.book.series.length > 0 ?this.props.store.book.series[0].seriesId: null,
                                // order: this.props.store.book.series.length > 0 ? this.props.store.book.series[0].seriesOrder: null,
                                lastChapter: this.props.store.book.lastChapter,
                                bookType: this.props.store.book.bookType ? this.props.store.book.bookType.typeId: null,
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
                            <div class="form-group" controlId="title">
                                <label>Title</label>
                                <input class="form-control" 
                                    type="text" 
                                    placeholder="Title"
                                    name="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
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
                                // variant="primary" 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                            </form>
                        )}
                        </Formik>
                        </Col>
                    </Row>
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
			JWT: state.listsReducer.JWT,
			listId: state.listsReducer.listId,
            bookId: state.listsReducer.book.bookId,
            // title: state.book.title,
            // authorName: state.book.authorName,
            // authorId: state.book.authorId,
            // statusName: state.book.statusName,
            // statusId: state.book.statusName==="In progress"?1:2,
            // lastChapter: state.book.lastChapter,
            seriesTitle: state.listsReducer.book.seriesTitle,
            // seriesOrder: state.book.seriesOrder,
            isLoaded: state.listsReducer.bookEdit.isLoaded,
            error: state.listsReducer.bookEdit.error,
            book: state.listsReducer.bookEdit.book
		}
	};
}

export default connect(
    mapStatetoProps,
    {
        openBookV2,
        titleAddSetResult,
        saveBookEdit
    }
)(BookEdit)