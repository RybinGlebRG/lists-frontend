import { createSlice } from '@reduxjs/toolkit'
import * as gamesForms from './forms.js'

export const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        form: gamesForms.LIST,
        isNeedListReload: false
    },
    reducers:{
        openGamesList: state=>{
            state.form = gamesForms.LIST
        },
        openGamesAdd: state=>{
            state.form = gamesForms.ADD
        },
        setNeedReload: (state,action)=>{
            state.isNeedListReload = action.payload.isNeedListReload
        }

    }
})

export const {openGamesList, openGamesAdd, setNeedReload} = gamesSlice.actions
// export const selectSeries = state => state.series

export default gamesSlice.reducer