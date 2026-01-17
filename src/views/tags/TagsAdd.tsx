import { useDispatch } from 'react-redux'
import useTags from '../../controller/tags/useTags';
import Header from '../common/header'
import { Formik, Field} from 'formik';
import {openTags} from '../../dao/book/booksSlice'
import DivFormGroup from '../common/DivFormGroup';

interface TagAddForm {
    name: string | null
}

export default function TagsAdd() {
    const dispatch = useDispatch();

    const {error, isLoaded, addTag} = useTags();

    let result;

    function handleSaveValue(values){
        addTag({
            name: values.name, 
            onUpdate: () => dispatch(openTags())
        })
    }

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

        let initialValues: TagAddForm = {
            name: null
        } 

        result=(
            <Formik
                initialValues={initialValues}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    handleSaveValue(values);
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
                <Field 
                    name="name"
                    validate={ (value: string | null) => {
                        let errorMessage: string | null = null;
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
                        <DivFormGroup controlId={field.name}>
                            <label>Name</label>
                            <input 
                                className="form-control" 
                                type="text" 
                                placeholder="Tag Name"
                                {...field}  
                            />
                            {meta.touched && meta.error && (
                            <div className="error">{meta.error}</div>
                            )}
                        </DivFormGroup> 
                    )}
                </Field>

                <button  className="btn btn-primary mt-4"
                    type="submit"
                    disabled={isSubmitting}
                >Submit</button>
                </form>
            )}
            </Formik>
        )
    }

    return(
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <Header
                                title="Add tag"
                                buttons={[]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {result}
                        </div>
                    </div>
                </div>
            </div>
        );

}
