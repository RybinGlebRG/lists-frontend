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
        }
    }
})

export const {openBook, switchListOrdering} = booksSlice.actions
export const selectBooksForm = state => state.form

export default booksSlice.reducer