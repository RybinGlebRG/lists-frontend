import { Formik, Field} from 'formik';
import {openAuthorList} from '../../../dao/book/booksSlice'
import { useDispatch } from 'react-redux'
import useAuthorList from '../../../controller/authors/useAuthorsList';


export default function AuthorAdd() {

    const dispatch = useDispatch();

    const {error, isLoaded, addAuthor} = useAuthorList();

    let result;

	if (error){
        result=( <div className="alert alert-danger" role="alert">{error}</div>);
    } else if (!isLoaded){
        result=( 
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-5" role="status">
                    <span className="sr-only"/>
                </div>
            </div>
        );
    } else {
        result=(
            <Formik
                initialValues={{ 
                    name: null
                }}
                validate={values => {
                    const errors: any = {};
                    if (!values.name) {
                        errors.name = 'Name must be set';
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    addAuthor({
                        body: values, 
                        onExecute: () => dispatch(openAuthorList())
                    });
                    setSubmitting(false);
                }}
            >
            {({
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
                    <Field 
                        name="name"
                        validate={value => {
                            let errorMessage;
                            if (!value) {
                                errorMessage = 'Name must be set';
                            }
                            return errorMessage;
                        }}
                    >
                        {({
                            field,
                            meta
                        })=>(                                        
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Name</label>
                                <input 
                                    id="nameInput"
                                    class="form-control" 
                                    type="text" 
                                    placeholder="Name"
                                    {...field}
                                />
                                {meta.error  && (
                                    <label className="text-danger">{meta.error}</label>
                                )}
                            </div>
                        )}
                    </Field>  

                    <button  
                        className="btn btn-primary"
                        type="submit"
                        disabled={isSubmitting}
                    >Submit</button>
                </form>
            )}
            </Formik>
        )
    }

    return (
        <div>
          {result}
        </div>
    )
}
