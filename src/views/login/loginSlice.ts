import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import User from '../../domain/user/User';
import type { RootState } from '../../redux/store'


interface LoginState {
    JWT: string | null,
    username: string | null,
    id: number | null
}

const initialState: LoginState = {
    JWT: null,
    username: null,
    id: null
}

export const loginSlice = createSlice({ 
    name: 'login',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<any>) => {
            state.JWT = action.payload.user.token;
            state.username = action.payload.user.name;
            state.id = action.payload.user.id;
        }
    }
})

export const {
    setUser
} = loginSlice.actions

export const selectUser = (state: RootState): User => {

    const loginState = state.loginReducer;

    if (loginState.id == null || loginState.username == null || loginState.JWT == null) {
        throw new Error("Login state cannot contain nulls");
    } else {
        return new User(loginState.id, loginState.username, loginState.JWT)
    }
}

export default loginSlice.reducer