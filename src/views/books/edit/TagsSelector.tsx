import { FieldArray } from "formik";
import { BookForm, TagForm } from "./BookEdit";
import Tag from "../../../domain/tag/Tag";
import { JSX, useState } from "react";
import { TagsController } from "../../../controller/tags/useTags";

interface TagsProps {
    values: BookForm,
    tagsController: TagsController
}

export default function TagsSelector(props: TagsProps): JSX.Element {

    const [selectedOnModalTags, setSelectedOnModalTags] = useState<string[]>(() => {
        const selectedTags: string[] = [];
        for (let i = 0; i < props.values.tags.length; i++) {
            selectedTags.push(props.values.tags[i].id);
        }
        return selectedTags;
    });

    const [filterField, setFilterField] = useState<string>("");

    let result: JSX.Element;

    const values = props.values;
    const tagsToShowOnModal = props.tagsController.data.filter(item => item.name.includes(filterField))

    result = (
        <FieldArray 
            name="tags"
            render={arrayHelpers => (

                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <label>Tags</label>
                            </div>
                        </div>
                        <div className="row">
                            { 
                                values.tags.length > 0 ?
                                (
                                    values.tags.map((tag, index) => (
                                        <div 
                                            className="col-md-auto mt-2" 
                                        >
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
                                    ))
                                )
                                : null
                            }
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-auto">

                                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#selectTagsModal">
                                    Select tags
                                </button>

                                <div className="modal fade" id="selectTagsModal" tabIndex={-1} aria-labelledby="selectTagsModal" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-scrollable">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="selectTagsModalLabel">Select tags</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row mb-3 border-bottom">
                                                    <div className="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="tagsFilter" className="form-label">Filter</label>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                id="tagsFilter"
                                                                placeholder="Filter value..."
                                                                onChangeCapture={(e) => {
                                                                    setFilterField(e.currentTarget.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    tagsToShowOnModal.map(tag => {
                                                        return(
                                                            <div className="row mb-2">
                                                                <div className="col"> 
                                                                    <div className="input-group">
                                                                        <div className="input-group-text">
                                                                            <input 
                                                                                className="form-check-input mt-0" 
                                                                                type="checkbox" 
                                                                                value="" 
                                                                                checked={selectedOnModalTags.includes(tag.id.toString())}
                                                                                onChange={e => {
                                                                                    if (e.target.checked) {
                                                                                        setSelectedOnModalTags([...selectedOnModalTags, tag.id.toString()]);
                                                                                    } else {
                                                                                        setSelectedOnModalTags(selectedOnModalTags.filter(item => item !== tag.id.toString()));
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <input type="text" className="form-control" disabled={true} value={tag.name}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary" 
                                                    data-bs-dismiss="modal" 
                                                    onClick={() => {
                                                    
                                                        // For each existing tag
                                                        for (let i = 0; i < props.tagsController.data.length; i++) {
                                                            const tag: Tag = props.tagsController.data[i];

                                                            // Get all tags selected on form
                                                            const selectedOnFormTags: string[] = props.values.tags.map(item => item.id.toString());

                                                            // If tag selected on modal
                                                            if (selectedOnModalTags.includes(tag.id.toString())) {
                                                                // But not selected on form
                                                                if (!selectedOnFormTags.includes(tag.id.toString())) {
                                                                    // Add to form
                                                                    let newTag: TagForm = {
                                                                        id: tag.id.toString(),
                                                                        name: tag.name
                                                                    } 
                                                                    arrayHelpers.push(newTag);
                                                                }
                                                            } 
                                                            // If not selected on modal
                                                            else {
                                                                // But selected on form
                                                                if (selectedOnFormTags.includes(tag.id.toString())) {
                                                                    // Find element index
                                                                    let index = values.tags.findIndex(item => item.id.toString() === tag.id.toString());
                                                                    // Remove from form
                                                                    if (index > -1) {
                                                                        arrayHelpers.remove(index);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }}
                                                >Select</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}                        
        />
    )

    return (
        <div className="row">
            <div className="col">
                {result}
            </div>
        </div>
    )
}
