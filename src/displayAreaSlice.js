import { createSlice } from '@reduxjs/toolkit'
import * as categories from './displayAreaCategories'

export const displayAreaSlice = createSlice({
    name: 'displayArea',
    initialState: {
        category: categories.READ_LIST
    },
    reducers:{
        openCategory: (state,action)=>{
            state.category = action.payload
        }
    }
})

export const {openCategory} = displayAreaSlice.actions
export const selectCategory = state => state.category

export default displayAreaSlice.reducer