import { createSlice } from '@reduxjs/toolkit'
import * as forms from './forms'
import BacklogItem from '../../domain/backlog/BacklogItem'

export interface BacklogSliceState {
    form: string,
    isReload: boolean,
    isInitialized: boolean,
    backlogItems: BacklogItem[]
}

const initialState: BacklogSliceState = {
    form: forms.LIST,
    isReload: false,
    isInitialized: false,
    backlogItems: []
}

export const backlogSlice = createSlice({
    name: 'backlog',
    initialState: initialState,
    reducers:{
        openBacklogList: (state)=>{
            state.form = forms.LIST;     
        },
        openBacklogItemAdd: (state)=>{
            state.form = forms.ADD;     
        },
        reload: (state) => {
            state.isReload = true;
        },
        setReloaded: (state) => {
            state.isReload = false;
        },
        setInitialized: (state) => {
            state.isInitialized = true;
        },
        setBacklogItems: (state, action) => {
            state.backlogItems = action.payload.backlogItems;
        }
    }
})

export const {
    openBacklogList,
    openBacklogItemAdd,
    reload,
    setReloaded,
    setInitialized,
    setBacklogItems
} = backlogSlice.actions

export default backlogSlice.reducer