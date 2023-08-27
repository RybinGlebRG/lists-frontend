import { createSlice } from '@reduxjs/toolkit'
import * as gamesForms from './forms.js'

export const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        form: gamesForms.LIST
    },
    reducers:{
        openGamesList: state=>{
            state.form = gamesForms.LIST
        },
        openGamesAdd: state=>{
            state.form = gamesForms.ADD
        }

    }
})

export const {openGamesList, openGamesAdd} = gamesSlice.actions
// export const selectSeries = state => state.series

export default gamesSlice.reducer