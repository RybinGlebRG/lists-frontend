import { createSlice } from '@reduxjs/toolkit'
import * as booksForms from './forms.js'

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        form: booksForms.SHOW_LIST,
        bookId: null,
        listOrdering: "DESC"
    },
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
    openAuthorAdd
} = booksSlice.actions
export const selectBooksForm = state => state.form

export default booksSlice.reducer