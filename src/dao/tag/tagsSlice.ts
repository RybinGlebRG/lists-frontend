import { createSlice } from '@reduxjs/toolkit'

export interface TagsState {
    tags: any[]
}

const iniState: TagsState = {
    tags: []
}

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: iniState,
    reducers:{
        openTagsList: (state) => {
            // state.form = tagsForms.LIST;
        } 
    }
})

export const {
    openTagsList, 
} = tagsSlice.actions
// export const selectBooksForm = state => state.form
// export const selectBookId = state => state.bookId

export default tagsSlice.reducer
