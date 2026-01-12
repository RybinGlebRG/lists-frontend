import React from 'react';
import { connect } from 'react-redux'
import {setListType, openTitlesList, openReadList, openSeriesList} from './redux/actionCreators';
import {openCategory} from './displayAreaSlice'
import * as categories from './displayAreaCategories'
import {
    openBookList
} from './readList/books/booksSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function Header(): JSX.Element {

    const dispatch = useDispatch();

    let store = {
        listType: useSelector((state: any) => state.listsReducer.listType),
        category: useSelector((state: any) => state.displayAreaReducer.category)
    }

    return(
        <div className="row">
            <div className="col">
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Lists</a>
                        <button 
                            className="navbar-toggler" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#navbarNav" 
                            aria-controls="navbarNav" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                <a 
                                    className={`nav-link ${store.listType === categories.BACKLOG ? "active": null}`} 
                                    href="#"
                                    onClick={() => {
                                        dispatch(openCategory(categories.BACKLOG))
                                    }}
                                >Backlog</a>
                                </li>

                                <li className="nav-item">
                                <a 
                                    className={`nav-link ${store.listType === categories.READ_LIST? "active": null}`} 
                                    href="#"
                                    onClick={() => {
                                        dispatch(openReadList())
                                        dispatch(openCategory(categories.READ_LIST))
                                        dispatch(openBookList())
                                    }}
                                >Books</a>
                                </li>
                                <li className="nav-item">
                                <a 
                                    className={`nav-link ${store.listType === categories.WATCH_LIST? "active": null}`}
                                    href="#"
                                    onClick={() => {
                                        dispatch(openTitlesList())
                                        dispatch(openCategory(categories.WATCH_LIST))
                                    }}
                                >Movies </a>
                                </li>
                                <li className="nav-item">
                                <a 
                                    className={`nav-link ${store.listType === categories.SERIES_MAIN? "active": null}`} 
                                    href="#"
                                    onClick={()=>{
                                        dispatch(openSeriesList())
                                        dispatch(openCategory(categories.SERIES_MAIN))
                                }}
                                >Series</a>
                                </li>

                                <li className="nav-item">
                                <a 
                                    className={`nav-link ${store.listType === categories.GAMES? "active": null}`}  
                                    href="#"
                                    onClick={()=>{
                                        dispatch(openCategory(categories.GAMES))
                                    }}
                                >Games</a>
                                </li>

                                <li className="nav-item">
                                <a 
                                    className="nav-link" 
                                    href="#"
                                    onClick={()=>{
                                    alert('Not Implemented')
                                }}
                                >Settings</a>
                                </li>

                                <li className="nav-item">
                                <a 
                                    className={`nav-link ${store.category === categories.METRICS? "active": null}`} 
                                    href="#"
                                    onClick={()=>{
                                        dispatch(openCategory(categories.METRICS))
                                }}
                                >Metrics</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
    
}
