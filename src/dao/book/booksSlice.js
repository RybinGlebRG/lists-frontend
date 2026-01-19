import { createSlice } from '@reduxjs/toolkit'
import * as booksForms from '../../views/books/forms'

const iniState = {
    form: booksForms.SHOW_LIST,
    bookId: null,
    listOrdering: "DESC"
}

export const booksSlice = createSlice({
    name: 'books',
    initialState: iniState,
    reducers:{
        openBook: (state,action)=>{
            state.form = booksForms.SHOW_BOOK;
            state.bookId = action.payload.bookId
        },
        switchListOrdering: state=>{
            if (state.listOrdering === "DESC"){
                state.listOrdering = "ASC"
            } else {
                state.listOrdering = "DESC"
            }
        },
        openBookUpdate: (state,action)=>{
            state.bookId = action.payload.bookId
            state.form = booksForms.SHOW_BOOK_UPDATE;     
        },
        openBookList: (state)=>{
            state.bookId = null
            state.form = booksForms.SHOW_LIST;     
        },
        openBookAdd: (state)=>{
            state.bookId = null
            state.form = booksForms.SHOW_BOOK_ADD;     
        },
        openAuthorList: (state)=>{
            state.bookId = null
            state.form = booksForms.SHOW_AUTHOR_LIST;     
        },
        openAuthor: (state)=>{
            state.bookId = null
            state.form = booksForms.SHOW_AUTHOR;     
        },
        openAuthorAdd: (state)=>{
            state.bookId = null
            state.form = booksForms.SHOW_AUTHOR_ADD;     
        },
        openTags: (state)=>{
            state.bookId = null
            state.form = booksForms.TAGS;     
        },
        openTagsAdd: (state)=>{
            state.bookId = null
            state.form = booksForms.TAGS_ADD;     
        }
    }
})

export const {
    openBook, 
    switchListOrdering, 
    openBookUpdate, 
    openBookList,
    openBookAdd,
    openAuthorList,
    openAuthor,
    openAuthorAdd,
    clearState,
    openTags,
    openTagsAdd
} = booksSlice.actions
export const selectBooksForm = state => state.form
export const selectBookId = state => state.bookId

export default booksSlice.reducer