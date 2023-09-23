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
                <li class="list-group-item"
                    
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
                <div class="row">
                    <div class="col d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
                            <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                        </svg>
                    </div>
                </div>
                
            )
        } else {
            expand = (
                <div class="row">
                    <div class="col d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
            )
        }


        chain = (
            <div class="row ps-3">
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

    let status;
    if (bookStatus.statusName === "In progress"){
        status=(
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={"bi bi-circle-fill text-primary"} viewBox="0 0 16 16">
                                   <circle cx="8" cy="8" r="8"/>
                                </svg>
        )
    } else if (bookStatus.statusName === "Completed"){
        status=(   
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-secondary" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>                 
        )
    }  else if (bookStatus.statusName === "Expecting"){
        status=(  
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill text-warning" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
        </svg>               
        )
    } else if (bookStatus.statusName === "Dropped") {    
        status=(
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill text-secondary" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
        )
    } else {
        status=(
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={"bi bi-circle-fill text-white"} viewBox="0 0 16 16">
                                   <circle cx="8" cy="8" r="8"/>
                                </svg>
        )
    }


    return (
        <div class="row" >
            <div class="col">
                <div class="row">
                    <div class="col">                    
                        <div 
                            class="row justify-content-between p-3"
                            // onClick={()=>{
                            //     dispatch(openBook({bookId: bookId}));
                            //     dispatch(openBookV2(bookId));
                            // }}
                        >
                            <div class="col">
                                <div class="row">
                                    <div class="col-auto">
                                        {status}
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
                    </div>
                    <div class="col d-flex justify-content-center align-items-center">
                        <ul class="list-group list-group-horizontal list-group-flush w-100 h-100 offset-md-10">
                            <li class="list-group-item list-group-item-action border-0 p-0">
                                
                                <button
                                    type="button"
                                    class="btn btn-link w-100 h-100 rounded-0 p-0"
                                    onClick={()=>{
                                        dispatch(openBook({bookId: bookId}));
                                        dispatch(openBookV2(bookId));
                                    }}
                                >
                                    <div class="row w-100 h-100 m-0">
                                        <div class="col-md-auto p-0 border-start h-75 align-self-center"/>
                                        <div class="col d-flex justify-content-center align-items-center p-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                            </svg>
                                        </div>
                                    </div>                                    
                                </button>
                            </li>
                        </ul>
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