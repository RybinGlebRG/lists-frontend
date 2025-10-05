import { Formik, Field} from 'formik';
import Header from '../../../common/header'
import useBacklogItems from '../list/useBacklogItems';
import * as dateUtils from '../../../utils/dateUtils'
import { useDispatch } from 'react-redux';
import { openBacklogList } from '../backlogSlice'
import DivFormGroup from '../../common/DivFormGroup';

interface BacklogItemForm {
    title: string | null,
    type: string | null,
    note: string | null,
    creationDate: string | null
}

interface BacklogItemFormError {
    title: string | null,
    type: string | null,
    note: string | null,
    creationDate: string | null
}

export default function BacklogList(): JSX.Element{
    const dispatch = useDispatch();

    const {createBacklogItem, reload} = useBacklogItems();

    function handleSaveValue(values: BacklogItemForm){

        let dt: Date | null = null;
        if (values.creationDate != null) {
            dt = dateUtils.fromInputStringZoned(values.creationDate);
        }

        if (values.title == null) {
            throw new Error("Incorrect data");
        }

        if (values.type == null) {
            throw new Error("Incorrect data");
        }

        createBacklogItem(
            {
                title: values.title,
                type: parseInt(values.type),
                note: values.note,
                creationDate: dt != null ? dateUtils.toStringInput(dt) : null

            },
            () => {
                dispatch(openBacklogList())
            }
        );
    }       

    const initialValues: BacklogItemForm = {
        title: null,
        type: "-1",
        note: null,
        creationDate: dateUtils.currentDateForInputZoned()
    }

    let content: JSX.Element = (
        <Formik
            initialValues={initialValues}
            // validate={values => {
            //     const errors: BacklogItemFormError = {
            //         title: null,
            //         type: null,
            //         note: null,
            //         creationDate: null
            //     };
                
            //     if (!values.title) {
            //         errors.title = 'Title must be set';
            //     }

            //     return errors;
            // }}
            onSubmit={(values, actions) => {
                try {
                    handleSaveValue(values);
                } catch (e) {
                    alert((e as Error).message)
                }
                actions.setSubmitting(false);
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
                        name="title"
                        validate={value => {
                            let errorMessage;
                            if (!value) {
                                errorMessage = 'Title must be set';
                            }
                            return errorMessage;
                        }}
                    >
                        {({
                            field,
                            meta
                        })=>(
                            <DivFormGroup controlId="title">
                                <label>Title</label>
                                <input 
                                    class="form-control" 
                                    type="text" 
                                    placeholder="Title"
                                    {...field}  
                                />
                                {meta.touched && meta.error && (
                                    <label className="text-danger">{meta.error}</label>
                                )}
                            </DivFormGroup> 
                        )}
                    </Field>

                    <Field 
                        name="type"
                        validate={(value: string) => {
                            let errorMessage: string | null = null;
                            if (value === "-1") {
                                errorMessage = 'Type must be set';
                            }
                            return errorMessage;
                        }}
                    >
                        {({
                            field,
                            meta
                        })=>(
                            <DivFormGroup controlId="type">
                                <label>Type</label>
                                <select className="form-control" 
                                    as="select"
                                    {...field}     
                                >   
                                    <option value="-1" >--</option>
                                    <option value="0">Book</option>
                                    <option value="1">Movie</option>
                                    <option value="2">Game</option>
                                </select>
                                {meta.touched && meta.error && (
                                    <label className="text-danger">{meta.error}</label>
                                )}
                            </DivFormGroup> 
                        )}

                    </Field>

                    <Field name="note">
                        {({
                            field
                        })=>(
                            <DivFormGroup controlId="note">
                                <label>Note</label>
                                <textarea
                                    className="form-control" 
                                    rows="3"
                                    {...field}                             
                                />
                            </DivFormGroup> 
                        )}

                    </Field>

                    <Field name="creationDate">
                        {({
                            field,
                            meta
                        })=>(
                            <DivFormGroup controlId={"creationDate"} >
                                <label>Creation date</label>
                                <input 
                                    className="form-control" 
                                    type="datetime-local" 
                                    {...field}
                                />
                            </DivFormGroup>
                        )}
                    </Field>

                    <button  
                        className="btn btn-outline-primary mt-4"
                        type="submit"
                        disabled={isSubmitting}
                    >Submit</button>
                </form>
            )}
        </Formik>
    );

    return(
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <Header
                            title="Add backlog item"
                            buttons={[
                                <button 
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={()=>{
                                        dispatch(openBacklogList());
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                    </svg>
                                </button>
                            ]}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}
