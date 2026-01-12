import React, {JSX, useState} from 'react'
import {v4 as uuidv4} from 'uuid';
import Book from '../../../domain/book/Book';
import {
    openBook,
    openBookUpdate
} from '../../../readList/books/booksSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as dateUtils from '../../../utils/dateUtils'
import * as statuses from '../../../readList/books/statuses';

function getMostRecentRecord({readingRecords}){
	let mostRecentRecord;

	for (let i = 0; i < readingRecords.length; i++){
		let currentRecord = readingRecords[i];
		let currentStartDate = new Date(currentRecord.startDate);

		if (mostRecentRecord != null){
			let mostRecentStartDate = new Date(mostRecentRecord.startDate);
			if (currentStartDate > mostRecentStartDate){
				mostRecentRecord = currentRecord;
			} else if (currentStartDate == mostRecentStartDate && currentRecord.recordId > mostRecentRecord.recordId){
				mostRecentRecord = currentRecord;
			}
		} else {
			mostRecentRecord = currentRecord;
		}
	}

	return mostRecentRecord;
}

export interface BookRowProps {
    book: Book;
    isChain: boolean;
}

export default function BookRow(props: BookRowProps){
    const dispatch = useDispatch();

    const uuid = uuidv4();    
    const [isExpand,setExpand] = useState(false);

    let chain; 
    if (props.book.chain != null && props.book.chain.length > 0){
        chain = props.book.chain.map(item=>{
            return(
                <li className="list-group-item" key={item.id}>
                    <BookRow
                        book={item}
                        isChain={true}
                    />
                </li>
            )
        })

        let expand: JSX.Element;
        if (isExpand){
            expand = (
                <div className="row">
                    <div className="col d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
                            <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                        </svg>
                    </div>
                </div>
                
            )
        } else {
            expand = (
                <div className="row">
                    <div className="col d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
            )
        }


        chain = (
            <div className="row ps-4 pe-4">
                <div className="col border-top">
                    <div className="row mb-3 mt-3">
                        <div className="col-md-auto">
                            <button 
                                className="btn btn-light border border-secondary" 
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
                    <div className="collapse" id={"collapseExample"+uuid}>
                        <div className="row">
                            <div className="col">
                                <ul className="list-group ms-4">
                                {chain}
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    const buttonsData = [
        {
            "key": 1,
            "name": "open book",
            "onClick": () => dispatch(openBook({bookId: props.book.id})),
            "SVG": (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
            )
        },
        {
            "key": 2,
            "name": "edit book",
            "onClick": () => dispatch(openBookUpdate({bookId: props.book.id})),
            "SVG": (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg> 
            )
        }
    ]
    const buttons = buttonsData.map(item => {
        return (
            <li className="list-group-item list-group-item-action border-0 p-0" key={item.key}>                       
                <button
                    type="button"
                    className="btn btn-link w-100 h-100 rounded-0 p-0"
                    onClick={item.onClick}
                    aria-label={item.name}
                >
                    <div className="row w-100 h-100 m-0">
                        <div className="col-md-auto p-0 border-start h-75 align-self-center"/>
                        <div className="col d-flex justify-content-center align-items-center p-0">
                            {item.SVG}
                        </div>
                    </div>                                    
                </button>
            </li>
        )
    })

    let note: JSX.Element;
    let content = "--";
    if (props.book.note) {
        content = props.book.note;
    }
    note = (
        <div className="col">       
            <div className="row justify-content-between p-3 w-100 h-100">
                <div className="col">
                    <p><u>Note</u></p>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
    

    let authors = "";
    if (props.book.textAuthors && props.book.textAuthors.length > 0) {
        let names = props.book.textAuthors.map(item => item.name);
        authors = `[${names.join(", ")}]`;
    }

    let title = `${props.book.title} ${props.book.bookType ? "("+props.book.bookType.typeName+")" : null}`;

    let data: JSX.Element = (
        <div className="col">					
            {props.book.lastChapter ? (
            <div className="row">
                <div className="col">Last chapter: {props.book.lastChapter}</div>
            </div>
            ): null}
        </div>
    )


    let mostRecentReadingRecord = getMostRecentRecord({readingRecords: props.book.readingRecords});
    let status;
    if (mostRecentReadingRecord != null){
        status = statuses.getStatusSVG({statusName: mostRecentReadingRecord.bookStatus.statusName});
    } else {
        status = statuses.getStatusSVG({statusName: "_fallback"});
    }

    let tagsItems = props.book.tags.map(tag => (
        <div className="col-md-auto pe-0">
            <span className="badge text-bg-secondary">{tag.name}</span>
        </div>
    ))

    const tags = (
        <div className="row justify-content-left ps-3">
            {tagsItems}
        </div>
    )

    let updated = dateUtils.formatToDisplayDate(props.book.lastUpdateDate);	

    return (
        <div className="row">
            <div className="col">
                <div className="row" >
                    <div className="col">
                        <div className="row justify-content-left p-3">
                            <div className="col-auto">
                                {status}
                            </div>
                            <div className="col ps-0 pt-1">
                                <div className="row">
                                    <div className="col-md-auto border-end">
                                        <h6 className="font-weight-bold">{`${authors} ${title}`}</h6>
                                    </div>
                                    <div className="col-md-auto">
                                        {`Updated: ${updated}`}
                                    </div>
                                </div>                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {tags}    
                            </div>    
                        </div>
                        <div className="row">
                            {note}
                            <div className="col border-start">                    
                                <div  className="row justify-content-between p-3">
                                    {data}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <ul className="list-group list-group-horizontal list-group-flush w-100 h-100 offset-md-10">
                            {buttons}
                        </ul>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        {chain}
                    </div>
                </div>
            </div>
        </div>
    )
}