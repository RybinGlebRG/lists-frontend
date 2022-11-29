import * as actionTypes from "./actionTypes";

export function openSeriesList() {
    return {
        type: actionTypes.OPEN_SERIES_LIST
    }
}

export function openBookList(bc_dif) {
    return {
        type: actionTypes.OPEN_BOOK_LIST,
        bc_dif: bc_dif
    }
}

export function openSignIn() {
    return {
        type: actionTypes.OPEN_SIGN_IN,
    }
}

export function openSeriesItem(seriesId, bc_dif) {
    return {
        type: actionTypes.OPEN_SERIES_ITEM,
        bc_dif: bc_dif,
        payload: {
            seriesId
        }
    }
}



export function openSeriesItemShow(){
    return {
        type: actionTypes.OPEN_SERIES_ITEM_SHOW,
    }
}

export function setJWT(JWT) {
    return {
        type: actionTypes.SET_JWT,
        payload: {
            JWT
        }
    }
} 

export function loginUser(JWT, user) {
    return {
        type: actionTypes.LOGIN_USER,
        payload: {
            JWT,
            user
        }
    }
}

export function seriesListSetLoadingState(error, isLoaded ,list,bookCounts) {
    return {
        type: actionTypes.SERIES_LIST_SET_LOADING_STATE,
        payload: {
            error,
            isLoaded,
            list,
            bookCounts
        }
    }
} 

export function seriesItemSetLoadingState(error, isLoaded , list) {
    return {
        type: actionTypes.SERIES_ITEM_SET_LOADING_STATE,
        payload: {
            error,
            isLoaded,
            list
        }
    }
} 

export function openBook(bookId){
    return {
        type: actionTypes.OPEN_BOOK,
        payload: {
            bookId: bookId
        }
    }
}

export function openAddBook(){
    return {
        type: actionTypes.OPEN_ADD_BOOK
    }
}

export function openBookV2(bookId,bc_dif){
    return {
        type: actionTypes.OPEN_BOOK_V2,
        bc_dif:bc_dif,
        payload: {
            bookId: bookId
        }
    }
}

export function bookSetLoadingState(error, isLoaded, title, authorName, authorId, statusName,lastChapter,seriesTitle, seriesOrder){
    return {
        type: actionTypes.BOOK_SET_LOADING_STATE,
        payload: {
            error: error,
            isLoaded: isLoaded,
            title: title,
            authorName: authorName,
            authorId: authorId,
            statusName: statusName,
            lastChapter: lastChapter,
            seriesTitle: seriesTitle,
            seriesOrder: seriesOrder
        }
    }
}

export function setListType(listType){
    return {
        type: actionTypes.SET_LIST_TYPE,
        payload: {
            listType: listType
        }
    }
}

export function openTitlesList(){
    return {
        type: actionTypes.OPEN_TITLES_LIST
    }
}

export function openReadList(){
    return {
        type: actionTypes.OPEN_READ_LIST
    }
}

export function openAddTitle(){
    return{
        type: actionTypes.OPEN_ADD_TITLE
    }
}

export function titleAddSetResult(ok,error){
    return {
        type: actionTypes.TITLE_ADD_SET_RESULT,
        payload: {
            ok: ok,
            error: error
        }
    }
}

export function openTitle(titleId){
    return {
        type: actionTypes.OPEN_TITLE,
        payload: {
            titleId: titleId
        }
    }
}



export function openUpdateBook(){
    return {
        type: actionTypes.OPEN_UPDATE_BOOK
    }
}

export function setBookListReload(isReload){
    return {
        type: actionTypes.SET_BOOK_LIST_RELOAD,
        payload: {
            isReload
        }
    }
}

export function openUpdateTitle(){
    return {
        type: actionTypes.OPEN_UPDATE_TITLE
    }
}


// Authors
export function openAuthorList(){
    return {
        type: actionTypes.OPEN_AUTHOR_LIST
    }
}
export function openAuthor(authorId){
    return {
        type: actionTypes.OPEN_AUTHOR,
        payload: {
            authorId: authorId
        }
    }
}
export function openAuthorAdd(){
    return {
        type: actionTypes.OPEN_AUTHOR_ADD,
    }
}


// Books
export function saveBookEdit(isLoaded,error,book){
    return {
        type: actionTypes.SAVE_BOOK_EDIT,
        payload: {
            isLoaded: isLoaded,
            error: error,
            book: book
        }
    }
}


// BookSeries
export function seriesItemAddBook(seriesId){
    return {
        type: actionTypes.SERIES_ITEM_ADD_BOOK,
        payload: {
            seriesId: seriesId
        }
    }
}
export function openSeriesAdd(){
    return {
        type: actionTypes.OPEN_SERIES_ADD,
    }
}
