import { createSlice } from '@reduxjs/toolkit'
import * as categories from '../views/displayAreaCategories'

export const displayAreaSlice = createSlice({
    name: 'displayArea',
    initialState: {
        category: categories.SIGN_IN
    },
    reducers:{
        openCategory: (state,action)=>{
            state.category = action.payload
        },
        openSignIn: (state,action)=>{
            state.category = categories.SIGN_IN
        },
        openSeriesList: (state)=>{
            state.category = categories.SERIES_MAIN
        }
    }
})

export const {openCategory,openSignIn,openSeriesList} = displayAreaSlice.actions
export const selectCategory = state => state.category

export default displayAreaSlice.reducer