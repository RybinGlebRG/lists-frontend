import { createSlice } from '@reduxjs/toolkit'

const iniState = {
    authorId: null
}

export const authorsSlice = createSlice({
    name: 'authors',
    initialState: iniState,
    reducers:{
        setAuthorId: (state, action) => {
            state.authorId = action.payload.authorId
        }
    }
})

export const {
    setAuthorId
} = authorsSlice.actions

export default authorsSlice.reducer
