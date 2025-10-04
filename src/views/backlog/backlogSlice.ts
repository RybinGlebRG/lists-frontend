import { createSlice } from '@reduxjs/toolkit'
import * as forms from './forms'

export const backlogSlice = createSlice({
    name: 'backlog',
    initialState: {
        form: forms.LIST
    },
    reducers:{

    }
})

export const {
    
} = backlogSlice.actions

export default backlogSlice.reducer