import BacklogItem from "../../../domain/backlog/BacklogItem";
import useBacklogItems from "../../../controller/backlog/useBacklogItems";
import * as dateUtils from '../../../crosscut/utils/dateUtils'
import SeriesItemType from "../../../domain/seriesitemtype/SeriesItemType";
import SeriesItemTypesEnum from "../../../domain/seriesitemtype/SeriesItemTypesEnum";
import { JSX } from "react";

export interface BacklogItemRowProps {
    backlogItem: BacklogItem
}

export default function BacklogItemRow(props: BacklogItemRowProps) {

    const {deleteBacklogItem, createBookMoveEvent} = useBacklogItems();

    let note: JSX.Element | null = null;
    if (props.backlogItem.note != null) {
        note = (
            <div className="row mt-2 mb-2 me-2">
                <div className="col">
                    <div className="form-floating">
                        <textarea 
                            className="form-control" 
                            placeholder="Leave a comment here" 
                            id="floatingTextarea"
                            disabled={true}
                        >{props.backlogItem.note}</textarea>
                        <label htmlFor="floatingTextarea">Note</label>
                    </div>                    
                </div>
            </div>
        )
    }

    let moveToListButton: JSX.Element | null = null;
    if (props.backlogItem.typeId === SeriesItemType.findByType(SeriesItemTypesEnum.BOOK).id) {
        moveToListButton = (
            <div className="col-md-auto">
                <button 
                    type="button" 
                    className="btn btn-outline-primary btn-sm"
                    onClick={()=>{
                        createBookMoveEvent(props.backlogItem)
                    }}
                >
                    Move to list
                </button>
            </div>
        );
    }

    return (
        <li className="list-group-item" key={props.backlogItem.id}>
            <div className="row mt-2 mb-2 me-2">
                <div className="col-md-auto">
                    {props.backlogItem.title}
                </div>
                <div className="col-md-auto border-start">
                    {SeriesItemType.findById(props.backlogItem.typeId).name}
                </div>
                <div className="col-md-auto border-start">
                    {dateUtils.formatToDisplayDate(props.backlogItem.creationDate)}
                </div>
                <div className="col">

                </div>
                <div className="col">
                    <div className="row justify-content-end align-self-center">
                        {moveToListButton}
                        <div className="col-md-auto">
                            <button 
                                type="button" 
                                className="btn btn-outline-danger btn-sm"
                                onClick={()=>{
                                    const isDelete = window.confirm("Delete this item?")
                                    if (isDelete){
                                        deleteBacklogItem(props.backlogItem.id);
                                    }
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {note}
        </li>
    )
}