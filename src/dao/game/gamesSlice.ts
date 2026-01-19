import { createSlice } from '@reduxjs/toolkit'
import * as gamesForms from '../../views/games/forms'

export interface GamesState {
    form: string,
    isNeedListReload: boolean
}

const initialState: GamesState = {
    form: gamesForms.LIST,
    isNeedListReload: false
}

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
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