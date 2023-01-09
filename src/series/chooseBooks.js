import React from 'react';
import { connect } from 'react-redux';
import {
    openSignIn
} from '../redux/actionCreators'
import { Formik} from 'formik';

class ChooseBooks extends React.Component{
    constructor(props){
		super(props);
		this.state={
			error: null,
            isLoaded: false,
            books: null,
        };
    }

    componentDidMount(){
		this.loadData()
		.then(res=>{
			this.setState({
				isLoaded:true,
				error:null,
				list: res.items
			});
		})
		.catch(err=>{
			this.setState({
				isLoaded:true,
				error:err.message,
				list: null
			});
		});
	}

    async loadData(){
		let body={
				sort:[{
					field:"createDate",
					ordering: this.state.bookOrdering
				}]
			}


		let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.listId}/books/search`,
		{
			method: "POST",
			headers: {
				'Authorization': `Bearer ${this.props.store.JWT}`,
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(body)
        });
		if (!res.ok){
			let result=await res.json();
            throw new Error('Error: '+result.errorMessage);
        };
		let bookList = await res.json();	
		return bookList;
	
	}

    render(){
        let items = this.state.list.map((item) =>{
			return (
                // <li class="list-group-item d-flex justify-content-between list-group-item-action"
                //     action
                // >
                //     <div class="row">
                //         <div class="col">
                //             <div class="row">
                //                 <div class="col">
                //                     <p class="font-weight-bold">{item.title}</p>
                //                 </div>
                //             </div>
                //             {item.bookType ? (
                //                 <div class="row">
                //                 <div class="col">Type: {item.bookType.typeName}</div>
                //             </div>
                //             ) : null}								
                //             <div class="row">
                //                 <div class="col">Status: {item.bookStatus.statusName}</div>
                //             </div>
                //             {item.lastChapter ? (
                //             <div class="row">
                //                 <div class="col">Last chapter: {item.lastChapter}</div>
                //             </div>
                //             ): null}
                //             <div class="row">
                //                 <div class="col">Added: {createDate}</div>
                //             </div>
                //         </div>
                //     </div>

                // </li>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id={item.bookId}/>
                    <label class="form-check-label" for={item.bookId}>
                    {item.title}
                    </label>
                </div>
			)
			 
		});
		
        let form=(
            <Formik 
                initialValues={{ 						 
                    title: null, 
                    author: null,
                    status: null,
                    series: null,
                    order: null,
                    lastChapter: null,
                    bookType: null
                }}
                validate={values => {
                    const errors = {};
                    if (!values.title) {
                        errors.title = 'Title must be set';
                    }
                    if ((values.series && !values.order) || (values.order && !values.series)) {
                        errors.series = 'Series and Order must be set together';
                        errors.order = 'Series and Order must be set together';
                    }
                    if (!values.status){
                        errors.status = 'Status must be set';
                    }

                    return errors;
                }}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    this.saveVals(values);
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
                            {items}
                            {/* <button  class="btn btn-primary"
                                variant="primary" 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </button> */}
                        </form>
                    )
                }
            </Formik>
        )
		 
		
	}

    

    

}

const mapStatetoProps = (state) => {   
    return {
        store: {
            JWT: state.listsReducer.JWT
        }
    };
}

export default connect(
    mapStatetoProps,
    { 
        openSignIn
    }
)(ChooseBooks)