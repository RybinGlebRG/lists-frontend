import { createSlice } from '@reduxjs/toolkit'
import * as seriesForms from '../../views/series/forms.js'

export const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        form: seriesForms.SHOW_ITEMS
    },
    reducers:{
        openSeriesItem: state=>{
            state.form = seriesForms.SHOW_ITEMS
        },
        openSeriesEdit: state=>{
            state.form = seriesForms.EDIT_SERIES
        },
        openChooseBooks: state=>{
            state.form = seriesForms.CHOOSE_BOOKS
        }
    }
})

export const {openSeriesItem, openSeriesEdit, openChooseBooks} = seriesSlice.actions
export const selectSeries = state => state.series

export default seriesSlice.reducer