import { createSlice } from '@reduxjs/toolkit'
import * as gamesForms from './forms.js'

export const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        form: gamesForms.LIST
    },
    reducers:{

    }
})

// export const {openSeriesItem, openSeriesEdit, openChooseBooks} = seriesSlice.actions
// export const selectSeries = state => state.series

export default gamesSlice.reducer