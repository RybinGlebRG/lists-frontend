import { Field, FieldArray } from "formik";
import DivFormGroup from "../../common/DivFormGroup";
import { BookForm } from "../../../readList/books/book/edit/BookEdit";

interface SeriesListProps {
    values: BookForm,
    seriesList: any[]
}

function validateSeries(value) {
    if (!value){
        return 'Series name must be set';
    }
}

export default function SeriesSelector(props: SeriesListProps) {

    let seriesListArray: JSX.Element[] = []
    for (let i = 0; i < props.seriesList.length; i++){
        seriesListArray.push(<option value={props.seriesList[i].seriesId}>{props.seriesList[i].title}</option>)
    }

    return (
        <FieldArray 
            name="seriesList"
            render={arrayHelpers => (
                <ul className="list-group list-group-flush">
                    <label>Series List</label>
                        { 
                            props.values.series.length > 0 ?
                            (
                                props.values.series.map((series, index) => (
                                        <li 
                                            className="list-group-item" 
                                            key={index}
                                        >
                                            <DivFormGroup controlId="seriesIds">
                                                <div className="row">
                                                    <Field 
                                                        name={`seriesIds[${index}]`}
                                                        validate={validateSeries}
                                                    >
                                                        {({
                                                            field,
                                                            meta
                                                        })=>(
                                                            <div className="col-md-auto">
                                                                <select 
                                                                    className="form-control" 
                                                                    as="select"
                                                                    {...field}   
                                                                >   
                                                                    <option value='' >Select series</option>
                                                                    {seriesListArray}
                                                                </select>
                                                                { meta.error ? (
                                                                    <label className="text-danger">
                                                                        {meta.error}
                                                                    </label>
                                                                ): null}
                                                            </div>
                                                        )}
                                                    </Field>

                                                    <div className="col">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </DivFormGroup>
                                        </li>
                                ))
                            )
                            : null
                        }

                        <div className="row">
                            <div className="col">
                                <button 
                                    type="button" 
                                    className="btn btn-outline-success mt-2"
                                    onClick={() => arrayHelpers.push({})}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                    </svg>
                                    Add series
                                </button>
                            </div>
                        </div>
                </ul>
            )}                        
        />
    )

}
