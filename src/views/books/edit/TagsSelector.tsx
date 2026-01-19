import { FieldArray } from "formik";
import { BookForm, TagForm } from "./BookEdit";
import Tag from "../../../domain/tag/Tag";
import { JSX } from "react";

interface TagsProps {
    values: BookForm,
    tagsArray: JSX.Element[],
    tags: Tag[] 
}

export default function TagsSelector(props: TagsProps) {

    const values = props.values;
    const tagsArray = props.tagsArray;
    const tags = props.tags;

    return (
        <FieldArray 
            name="tags"
            render={arrayHelpers => (
                <ul className="list-group list-group-flush">
                    <label>Tags</label>
                        { 
                            values.tags.length > 0 ?
                            (
                                values.tags.map((tag, index) => (
                                        <li 
                                            className="list-group-item" 
                                            key={index}
                                        >
                                            
                                            <div className="row">
                                                <div className="col-md-auto">
                                                    <div className="input-group">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            disabled={true}
                                                            value={tag.name}
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
                                            
                                        </li>
                                ))
                            )
                            : null
                        }

                        <div className="row mt-4">
                            <div className="col">

                                <div className="input-group">
                                    <select
                                        id='tagSelector'
                                        className="form-select"
                                    >
                                        <option selected>Select tag</option>
                                        {tagsArray}
                                    </select>
                                    <button 
                                        className="btn btn-outline-success" 
                                        type="button"
                                        onClick={() => {
                                            const tagSelector: HTMLSelectElement | null = document.getElementById('tagSelector') as HTMLSelectElement;
                                            if (tagSelector != null) {

                                                const inputValue = tagSelector.value;
                                                if (inputValue != null && tags != null) {
                                                    
                                                    let tag: TagForm | undefined = tags
                                                        .filter(item => item.id.toString() === inputValue)
                                                        .map((item: Tag )=> {
                                                            let newTag: TagForm = {
                                                                id: item.id.toString(),
                                                                name: item.name
                                                            } 
                                                            return newTag;
                                                        })
                                                        .pop()

                                                    if (tag != undefined) {
                                                        arrayHelpers.push(tag);
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                        </svg>
                                        Add tag
                                    </button>
                                </div>
                            </div>
                        </div>
                </ul>
            )}                        
        />
    )
}
