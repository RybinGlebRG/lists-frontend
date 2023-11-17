import React from 'react';
import {openSignIn,openSeriesList} from '../redux/actionCreators';
import { connect } from 'react-redux';
import { Formik} from 'formik';

class SeriesAdd extends React.Component {

    constructor(props){
		super(props);
		this.state={
			error:null
		};
	}

	async performSaveVals(series){
		let res = await fetch(
			window.location.origin+`/api/v0.2/readLists/${this.props.store.readListId}/series`,
			{
				method: "POST",
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'Authorization': `Bearer ${this.props.store.JWT}`
				},
				body: JSON.stringify(series)
			}
		);

		if (!res.ok){
            let result=await res.json();
            throw new Error('Error: '+result.errorMessage);
        };
	}

    saveVals(values){
        let series = {
            title: values.title,      
        }

        this.performSaveVals(series)
		.then(res=>{
			this.props.openSeriesList();
		})
        .catch(
            err => {
                this.setState({
					error:err.message
				});
        });
		
    }
	

    render(){
		let form=(
			<Formik 
				initialValues={{ 						 
					title: null
				}}
				validate={values => {
					const errors = {};
					if (!values.title) {
						errors.title = 'Title must be set';
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
						{/* {console.log(values)} */}
						<div class="mb-2">
							<div class="form-group" controlId="title">
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
						</div>
						<div class="row justify-content-left">
							<div class="col-md-auto">
								<button  class="btn btn-primary"
									variant="primary" 
									type="submit"
									disabled={isSubmitting}
								>Submit</button>
							</div>
						</div>
					</form>
					)
				}
			</Formik>
        )

		let alert;

		if (this.state.error){
			alert=( 
				<div class="alert alert-danger" role="alert">{this.state.error}</div>
			);
		}

		return (
			<div class="row justify-content-center">
				<div class="col col-md-10 pr-5">
					<div class="row">
						<div class="col pb-2 mt-4 mb-2 border-bottom">
							<h3>Add Series</h3>
						</div>
					</div>
					<div class="row">
						<div class="col">
							{form}
						</div>
					</div>
					<div class="row">
						<div class="col">
							{alert}
						</div>
					</div>
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
	{ openSignIn,openSeriesList}
  )(SeriesAdd)