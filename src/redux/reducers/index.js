import * as actionTypes from '../actionTypes'
import {SERIES_LIST, BOOK_LIST, SIGN_IN, SERIES_ITEM, BOOK, ADD_BOOK, BOOK_V2, ADD_TITLE, TITLES_LIST, READ_LIST} from '../../panels.js'
import * as panels from '../../panels.js'
// import seriesItem from '../../seriesItem/seriesItem';

const initialState = {
    user: null,
    listId: 2,
    panel: panels.SIGN_IN,
    watchListId: 4,
    listType: 'readList',
    JWT:null,
    seriesId:null,
    bc_dif: null,
    seriesList:{
        error: null,
        isLoaded: false,
        list:{},
        bookCounts:{}
    },
    seriesItem:{
        seriesId: null,
        // error: null,
        // isLoaded: false,
        // list:null,
        isAdd: false
    },
    bookList:{
        isReload: false
    },
    book: {
        bookId: null,
        error: null,
        isLoaded: null,
        title: null,
        authorName: null,
        authorId: null,
        statusName: null,
        lastChapter: null,
        seriesTitle: null,
        seriesOrder: null
    },
    author:{
        authorId: null
    },
    bookEdit: {
        book: null,
        isLoaded: false,
        error: null
    },
    titlesList: {
        ok: false,
        data: null,
        error: null
    },
    titleAdd: {
        ok: false,
        error: null
    },
    title: {
        titleId: null
    }
}

export function lists(state = initialState, action){
    switch (action.type){
        case actionTypes.OPEN_SERIES_LIST:{
            return {
                ...state, 
                panel: SERIES_LIST
            }
        }
        case actionTypes.OPEN_BOOK_LIST:
            return {...state, panel: BOOK_LIST}
        case actionTypes.OPEN_SIGN_IN:
            return {...state, panel: SIGN_IN}
        case actionTypes.OPEN_SERIES_ITEM:{
            return {
                ...state, 
                panel: SERIES_ITEM,         
                seriesItem:{
                    ...state.seriesItem,
                    seriesId: action.payload.seriesId,
                    isAdd: false
                }
            }
        }
        case actionTypes.SET_JWT:
            return {...state, JWT: action.payload.JWT}
        case actionTypes.SERIES_LIST_SET_LOADING_STATE:{
            return {
                ...state,
                seriesList:{
                    error: action.payload.error,
                    isLoaded: action.payload.isLoaded,
                    list: action.payload.list,
                    bookCounts: action.payload.bookCounts
                }
            }
        }
        case actionTypes.SERIES_ITEM_SET_LOADING_STATE:{
            return {
                ...state, 
                seriesItem:{
                    ...state.seriesItem,
                    error: action.payload.error,
                    isLoaded: action.payload.isLoaded,
                    list: action.payload.list,
                    seriesId: state.seriesItem.seriesId
                }
            }
        }
        

        case actionTypes.OPEN_SERIES_ITEM_SHOW:{
            return {
                ...state, 
                seriesItem:{
                    ...state.seriesItem,
                    isAdd:false,
                    
                }
            }
        }
        case actionTypes.LOGIN_USER:
            return {
                ...state, 
                JWT: action.payload.JWT,
                user: action.payload.user
            }

        case actionTypes.OPEN_BOOK:
            return {
                ...state,
                book: {
                    bookId: action.payload.bookId
                },
                panel: BOOK
            }
        case actionTypes.OPEN_BOOK_V2:{
            return {
                ...state,
                book: {
                    bookId: action.payload.bookId
                },
                panel: BOOK_V2
            }
        }
        case actionTypes.OPEN_ADD_BOOK:
            return {
                ...state,
                panel: ADD_BOOK
            }
        case actionTypes.BOOK_SET_LOADING_STATE:{
            return {
                ...state,
                book: {
                    bookId: state.book.bookId,
                    error: action.payload.error,
                    isLoaded: action.payload.isLoaded,
                    title: action.payload.title,
                    authorName: action.payload.authorName,
                    authorId: action.payload.authorId,
                    statusName: action.payload.statusName,
                    lastChapter: action.payload.lastChapter,
                    seriesTitle: action.payload.seriesTitle,
                    seriesOrder: action.payload.seriesOrder
                }
            }
        }
        case actionTypes.SET_LIST_TYPE:
            return {
                ...state,
                listType: action.payload.listType
            }
        case actionTypes.OPEN_TITLES_LIST:
            return {
                ...state,
                listType: 'watchList',
                panel: TITLES_LIST
            }
        case actionTypes.OPEN_READ_LIST:
            return {
                ...state,
                listType: 'readList',
                panel: BOOK_LIST
            }
        case actionTypes.OPEN_ADD_TITLE:
            return {
                ...state,
                panel: ADD_TITLE
            }
        case actionTypes.TITLE_ADD_SET_RESULT:
            return {
                ...state,
                titleAdd: {
                    ...state.titleAdd,
                    ok: action.payload.ok,
                    error: action.payload.error
                }
            }
        case actionTypes.OPEN_TITLE:
            return {
                ...state,
                panel: panels.TITLE,
                title: {
                    ...state.title,
                    titleId: action.payload.titleId
                }
            }
        case actionTypes.OPEN_UPDATE_BOOK:
            return {
                ...state,
                panel: panels.UPDATE_BOOK
            }
        case actionTypes.SET_BOOK_LIST_RELOAD:
            return {
                ...state,
                bookList: {
                    ...state.bookList,
                    isReload: action.payload.isReload
                }
            }
        case actionTypes.OPEN_UPDATE_TITLE:
            return {
                ...state,
                panel: panels.UPDATE_TITLE
            }


        // Authors
        case actionTypes.OPEN_AUTHOR_LIST:
            return {
                ...state,
                panel: panels.AUTHOR_LIST
            }
        case actionTypes.OPEN_AUTHOR:
            return {
                ...state,
                panel: panels.AUTHOR,
                author:{
                    ...state.author,
                    authorId: action.payload.authorId
                }
            }
        case actionTypes.OPEN_AUTHOR_ADD:
            return {
                ...state,
                panel: panels.AUTHOR_ADD
            }


        // Books
        case actionTypes.SAVE_BOOK_EDIT:
            return {
                ...state,
                bookEdit:{
                    ...state.bookEdit,
                    isLoaded: action.payload.isLoaded,
                    error: action.payload.error,
                    book: action.payload.book
                }
            } 


        // BookSeries
        case actionTypes.SERIES_ITEM_ADD_BOOK:{
            return {
                ...state, 
                seriesItem:{
                    ...state.seriesItem,
                    isAdd:true,
                    seriesId: action.payload.seriesId
                    
                }
            }
        }
        case actionTypes.OPEN_SERIES_ADD:{
            return {
                ...state,
                panel: panels.SERIES_ADD
            }
        }

        default:
            return state
    }
    
}