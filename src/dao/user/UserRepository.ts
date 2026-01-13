import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import type { RootState } from '../../redux/store'
import User from '../../domain/user/User';
import store from '../../redux/store'


export async function getCurrentUser(): Promise<User> {
    const state: RootState = store.getState();

    if (state.loginReducer.id == null || state.loginReducer.username == null || state.loginReducer.JWT == null) {
        throw new Error("Login state cannot contain nulls");
    } else {
        return Promise.resolve(new User(state.loginReducer.id, state.loginReducer.username, state.loginReducer.JWT));
    }
}
