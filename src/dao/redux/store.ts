import { configureStore, Reducer } from '@reduxjs/toolkit'
// import { createStore, combineReducers } from "redux";
import lists from "./reducers/index";
import seriesReducer from '../series/seriesSlice'
import displayAreaReducer from '../displayAreaSlice'
import booksReducer from '../book/booksSlice'
import gamesReducer from '../game/gamesSlice'
import loginReducer, { LoginState } from '../user/loginSlice'
import tagsReducer, { TagsState } from '../tag/tagsSlice'
import authorsReducer, { AutorsState } from '../author/authorsSlice'
import backlogReducer, { BacklogState } from '../backlog/backlogSlice'


// const rootReducer = combineReducers({
//     listsReducer: lists
//   })

interface Store {
  reducer: StoreReducer
}

interface StoreReducer {
  listsReducer: Reducer<any>,
  seriesReducer: Reducer<any>,
  displayAreaReducer: Reducer<any>,
  booksReducer: Reducer<any>,
  gamesReducer: Reducer<any>,
  loginReducer: Reducer<LoginState>,
  tagsReducer: Reducer<TagsState>,
  authorsReducer: Reducer<AutorsState>,
  backlogReducer: Reducer<BacklogState>
}

const storeConfiguration: Store = {
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
}

const store = configureStore(storeConfiguration)

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
