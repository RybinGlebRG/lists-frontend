import { createSlice } from '@reduxjs/toolkit'
import * as booksForms from './forms.js'

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        form: booksForms.SHOW_LIST,
        bookId: null
    },
    reducers:{
        openBook: (state,action)=>{
            state.form = booksForms.SHOW_BOOK;
            state.bookId = action.payload.bookId
        }
    }
})

export const {openBook} = booksSlice.actions
export const selectBooksForm = state => state.form

export default booksSlice.reducer