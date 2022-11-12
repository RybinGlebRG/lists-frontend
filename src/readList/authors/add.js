import React from 'react';
import {openSignIn, openAuthorList} from '../../redux/actionCreators';
import { connect } from 'react-redux';
import { Formik} from 'formik';


class AuthorAdd extends React.Component{
    constructor(props){
		super(props);
		this.state={
			isLoaded:false,
			data:null,
			error:null
		};
	}

    async addAuthorAsync(values){
		let res = await fetch(window.env.BACKEND_ADDR_V2+`/api/v0.2/readLists/${this.props.store.listId}/authors`,
		{
			method: "POST",
			headers: {
                'Content-Type': 'application/json;charset=utf-8',
				'Authorization': 'Bearer '+this.props.store.JWT
			},
            body: JSON.stringify(values)
		});
		if (!res.ok){
            throw new Error('Some network error');
        };	

        return res;
	}

    addAuthor(values){
        this.addAuthorAsync(values)
        .then(res=>{
			this.props.openAuthorList();
		})
        .catch(err=>{
			this.setState({
				isLoaded:true,
				error:err.message
			});
		});
    }



    render(){
        let displayPanel;
        let alert;
        if (this.state.error){
            displayPanel=(
                <div class="alert alert-danger" role="alert">{this.state.error}</div>
            )
        } else {
            displayPanel=(
                        <Formik
                            initialValues={{ 
                                name: null
                            }}
                            validate={values => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = 'Name must be set';
                                }
                                return errors;
                            }}
                            onSubmit={(values, {setSubmitting, resetForm}) => {
                                setSubmitting(true);
                                this.addAuthor(values);
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
            )
        }
        return(
            <div>
            {displayPanel}
            </div>
        )
    }

    


}

const mapStatetoProps = (state) => {
	return {
		store: {
			JWT: state.JWT,
			listId: state.listId
		}
	};
}
export default connect(
	mapStatetoProps,
	{ openSignIn,openAuthorList}
  )(AuthorAdd)