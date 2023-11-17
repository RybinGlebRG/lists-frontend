import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        JWT: null,
        username: null
    },
    reducers:{
        setJWT: (state,action)=>{
            state.JWT = action.payload;
        },
        setUsername: (state,action)=>{
            state.username = action.payload;
        }
    }
})

export const {
    openSignIn,
    setJWT,
    setUsername
} = loginSlice.actions

export default loginSlice.reducer