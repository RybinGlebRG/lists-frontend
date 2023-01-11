import React from 'react';
import { connect } from 'react-redux';
import { Formik} from 'formik';
import {openBookList} from '../../redux/actionCreators';

class BookAdd extends React.Component{
	constructor(props){
		super(props);
		this.state={
			error: null,
            authors:null,
            series: null,
            isLoaded: false
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

        let out = {
            authors: authors.items,
            series: series.items
        }


        return out;       
    }

    load(){
        this.loadData()
        .then(result =>{
            this.setState({
                authors: result.authors,
                series: result.series,
                isLoaded: true
            });  
        })
        .catch(
            error => {
                this.setState({
                    error: error.error,
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
                <div class="alert alert-danger" role="alert">{this.state.error}</div>
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
            displayPanel=(
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col pb-2 mt-4 mb-2 border-bottom">
                                <h3>Add Book</h3>
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
                                        bookType: null
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
                                                    <option value="1">Book</option>
                                                    <option value="2">Light Novel</option>
                                                    <option value="3">Webtoon</option>
                                                </select>
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
        openBookList
    }
)(BookAdd)