import { configureStore } from '@reduxjs/toolkit'
import { createStore, combineReducers } from "redux";
import lists from "./reducers/index.js";
import seriesReducer from '../series/seriesSlice'


// const rootReducer = combineReducers({
//     listsReducer: lists
//   })


export default  configureStore({ 
    reducer: {
      listsReducer: lists,
      seriesReducer: seriesReducer
    } 
})

// export default createStore(
//     rootReducer, 
//     initialRootState,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     );

