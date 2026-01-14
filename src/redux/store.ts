import { configureStore } from '@reduxjs/toolkit'
// import { createStore, combineReducers } from "redux";
import lists from "./reducers/index";
import seriesReducer from '../series/seriesSlice.js'
import displayAreaReducer from '../displayAreaSlice.js'
import booksReducer from '../readList/books/booksSlice.js'
import gamesReducer from '../games/gamesSlice.js'
import loginReducer from '../dao/user/loginSlice'
import tagsReducer from '../views/tags/tagsSlice.js'
import authorsReducer from '../dao/author/authorsSlice.js'
import backlogReducer from '../views/backlog/backlogSlice'
import { useDispatch, useSelector } from 'react-redux'


// const rootReducer = combineReducers({
//     listsReducer: lists
//   })

const store = configureStore({ 
    reducer: {
      listsReducer: lists,
      seriesReducer: seriesReducer,
      displayAreaReducer: displayAreaReducer,
      booksReducer: booksReducer,
      gamesReducer: gamesReducer,
      loginReducer: loginReducer,
      tagsReducer: tagsReducer,
      authorsReducer: authorsReducer,
      backlogReducer: backlogReducer
    } 
})

// export default createStore(
//     rootReducer, 
//     initialRootState,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     );

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector = useSelector.withTypes<RootState>()
