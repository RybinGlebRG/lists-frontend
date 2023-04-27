import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    openBookV2
} from '../../redux/actionCreators'
import {
    openBook
} from './booksSlice'
import {v4 as uuidv4} from 'uuid';
import * as dateUtils from '../../utils/dateUtils'

export default function Row(props){
    const dispatch = useDispatch();
    const title = props.title;
    const bookType = props.bookType;
    const bookStatus = props.bookStatus;
    const lastChapter = props.lastChapter;
    const createDate = props.createDate;
    const bookId = props.bookId;
    const chainBooks = props.chainBooks;
    const uuid = uuidv4();
    const [isExpand,setExpand] = useState(false);


    let chain; 
    if (chainBooks !== undefined && chainBooks.length > 0){
        chain = chainBooks.map(item=>{
            return(
                <li class="list-group-item list-group-item-action "
                    action
                    // onClick={() => {
                    // 	this.props.openBookV2(item.bookId);
                    // }} 
                >
                    <Row 
                        title={item.title}
                        bookType={item.bookType}
                        bookStatus={item.bookStatus}
                        lastChapter={item.lastChapter}
                        createDate={dateUtils.formatToDisplay(item.insertDate)}
                        bookId={item.bookId}
                    />

                </li>
            )
        })

        let expand;
        if (isExpand){
            expand = (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                </svg>
            )
        } else {
            expand = (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
            )
        }


        chain = (
            <div class="row">
                <div class="col">
                    <div class="row mb-3 mt-3">
                        <div class="col-md-auto">
                            <button 
                                class="btn btn-light border border-secondary" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={"#collapseExample"+uuid} 
                                aria-expanded="false" 
                                aria-controls={"collapseExample"+uuid}
                                onClick={()=>{
                                    if (isExpand){
                                        setExpand(false)
                                    } else {
                                        setExpand(true)
                                    }
                                }}
                            >
                                {expand}
                            </button>
                        </div>
                    </div>
                    <div class="collapse" id={"collapseExample"+uuid}>
                        <div class="row">
                            <div class="col">
                                <ul class="list-group ms-4">
                                {chain}
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    let statusColor ;
    if (bookStatus.statusName === "In Progress"){
        statusColor = "text-primary"
    } else if (bookStatus.statusName === "Completed"){
        statusColor = "text-secondary"
    }  else if (bookStatus.statusName === "Waiting"){
        statusColor = "text-warning"
    } else {
        statusColor = "text-white"
    }


    return (
        <div class="row" >
            <div class="col">
                <div 
                    class="row justify-content-between"
                    onClick={()=>{
                        dispatch(openBook({bookId: bookId}));
                        dispatch(openBookV2(bookId));
                    }}
                >
                    <div class="col">
                        <div class="row">
                            <div class="col-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={"bi bi-circle-fill "+statusColor} viewBox="0 0 16 16">
                                   <circle cx="8" cy="8" r="8"/>
                                </svg>
                            </div>
                            <div class="col ps-0">
                                <p class="font-weight-bold">{title} {bookType ? "("+bookType.typeName+")" : null}</p>
                            </div>
                        </div>							
                        {lastChapter ? (
                        <div class="row">
                            <div class="col">Last chapter: {lastChapter}</div>
                        </div>
                        ): null}
                        <div class="row">
                            <div class="col">Added: {createDate}</div>
                        </div>
                        
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        {chain}
                    </div>
                </div>

            </div>
        </div>
    )
}