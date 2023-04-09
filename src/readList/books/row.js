import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    openBookV2
} from '../../redux/actionCreators'
import {
    openBook
} from './booksSlice'

export default function Row(props){
    const dispatch = useDispatch();
    const title = props.title;
    const bookType = props.bookType;
    const bookStatus = props.bookStatus;
    const lastChapter = props.lastChapter;
    const createDate = props.createDate;
    const bookId = props.bookId;


    return (
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
    )
}