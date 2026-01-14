import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import User from '../../domain/user/User';
import type { RootState } from '../../redux/store'


interface LoginState {
    JWT: string | null,
    username: string | null,
    id: number | null,
    refreshToken: string | null
}

interface SetUserPayload {
    user: User
}

interface SetUserDataPayload {
    id: number,
    name: string,
    accessToken: string,
    refreshToken: string
}

const initialState: LoginState = {
    JWT: null,
    username: null,
    id: null,
    refreshToken: null
}

export const loginSlice = createSlice({ 
    name: 'login',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<SetUserPayload>) => {
            state.JWT = action.payload.user.accessToken;
            state.username = action.payload.user.name;
            state.id = action.payload.user.id;
            state.refreshToken = action.payload.user.refreshToken;
        },

        setUserData: (state, action: PayloadAction<SetUserDataPayload>) => {
            state.JWT = action.payload.accessToken;
            state.username = action.payload.name;
            state.id = action.payload.id;
            state.refreshToken = action.payload.refreshToken;
        }
    }
})

export const {
    setUser,
    setUserData
} = loginSlice.actions

export const selectUser = (state: RootState): User => {

    const loginState = state.loginReducer;

    if (loginState.id == null || loginState.username == null || loginState.JWT == null || loginState.refreshToken == null) {
        throw new Error("Login state cannot contain nulls");
    } else {
        return new User(loginState.id, loginState.username, loginState.JWT, loginState.refreshToken)
    }
}

export default loginSlice.reducer