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


    let chain; 
    if (chainBooks !== undefined && chainBooks.length > 0){
        chain = chainBooks.map(item=>{
            return(
                <li class={"list-group-item list-group-item-action "+ 
						// (item.bookStatus.statusId === 1 ? "text-bg-primary" : "") +
						(item.bookStatus.statusId === 2 ? "text-bg-secondary" : "")
                }
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


        chain = (
            <div class="row">
                <div class="col">
                    <div class="row mb-3 mt-3">
                        <div class="col-md-auto">
                            <button class="btn btn-info" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseExample"+uuid} aria-expanded="false" aria-controls={"collapseExample"+uuid}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
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
                            <div class="col">
                                <p class="font-weight-bold">{title} {bookType ? "("+bookType.typeName+")" : null}</p>
                            </div>
                        </div>							
                        <div class="row">
                            <div class="col">Status: {bookStatus.statusName}</div>
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