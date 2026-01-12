import { Field, FieldArray } from "formik";
import DivFormGroup from "../../common/DivFormGroup";
import { BookForm, SeriesForm } from "../../../readList/books/book/edit/BookEdit";
import ISeriesList, { ISeriesItem } from "../../../dao/series/ISeriesList";

interface SeriesListProps {
    values: BookForm,
    seriesList: ISeriesItem[]
}

function validateSeries(value) {
    if (!value){
        return 'Series name must be set';
    }
}

export default function SeriesView(props: SeriesListProps) {

    let seriesListArray: JSX.Element[] = []
    for (let i = 0; i < props.seriesList.length; i++){
        seriesListArray.push(<option value={props.seriesList[i].seriesId}>{props.seriesList[i].title}</option>)
    }

    return (
        <FieldArray 
            name="series"
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

                                            <Field 
                                                name={`series[${index}].title`}
                                            >
                                                {({
                                                    field
                                                })=>(
                                                    <div className="row">
                                                        <div className="col-md-auto">
                                                            <div className="input-group">
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    disabled={true}
                                                                    {...field}
                                                                />
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
                                                    </div>
                                                )}
                                            </Field>
                                            
                                            
                                        </li>
                                ))
                            )
                            : null
                        }

                        <div className="row mt-4">
                            <div className="col">

                                <Field 
                                    name={"seriesSelector"}
                                >
                                    {({
                                        field
                                    })=>(
                                        <div className="input-group">
                                            <select
                                                className="form-select"
                                                {...field}
                                            >
                                                <option selected>Select series</option>
                                                {seriesListArray}
                                            </select>
                                            <button 
                                                className="btn btn-outline-success" 
                                                type="button"
                                                onClick={() => {

                                                    if (field.value != null && props.seriesList != null) {
                                                        
                                                        let series: SeriesForm | undefined = props.seriesList
                                                            .filter(item => item.seriesId.toString() === field.value)
                                                            .map((item: ISeriesItem )=> {
                                                                let res: SeriesForm = {
                                                                    id: item.seriesId.toString(),
                                                                    title: item.title
                                                                } 
                                                                return res;
                                                            })
                                                            .pop()

                                                        if (series != undefined) {
                                                            arrayHelpers.push(series);
                                                        }
                                                    }
                                                    
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                                </svg>
                                                Add sereis
                                            </button>
                                        </div>
                                    )}
                                </Field>
                            </div>
                        </div>
                </ul>
            )}                        
        />
    )

}
