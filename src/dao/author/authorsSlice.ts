import { createSlice } from '@reduxjs/toolkit'

export interface AutorsState {
    authorId: number | null
}

const iniState: AutorsState = {
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
