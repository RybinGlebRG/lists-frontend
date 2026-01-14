import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import type { RootState } from '../../redux/store'
import User from '../../domain/user/User';
import store from '../../redux/store'
import * as commonApi from '../../common/commonApi'


export async function getCurrentUser(): Promise<User> {
    const state: RootState = store.getState();

    if (state.loginReducer.id == null || state.loginReducer.username == null || state.loginReducer.JWT == null || state.loginReducer.refreshToken == null) {
        throw new Error("Login state cannot contain nulls");
    } else {
        return Promise.resolve(new User(state.loginReducer.id, state.loginReducer.username, state.loginReducer.JWT, state.loginReducer.refreshToken));
    }
}

interface UserViewIn{
    id: number,
    name: string,
    accessToken: string,
    refreshToken: string,
}

export async function getUser(username: string, password: string): Promise<User>{
    const vals={
        "username": username,
        "password": password
    }
    let res = await fetch(
        window.location.origin+`/api/v1/users/tokens`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(vals)
        }
    );
    await commonApi.checkError(res, undefined);
    return res.json()
        .then((json: UserViewIn) => new User(json.id, json.name, json.accessToken, json.refreshToken));
}

export async function refreshUser(user: User): Promise<User>{
    const vals={
        "refreshToken": user.refreshToken
    }
    let res = await fetch(
        window.location.origin+`/api/v1/users/refreshtoken`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(vals)
        }
    );
    await commonApi.checkError(res, undefined);
    return res.json()
        .then((json: UserViewIn) => new User(json.id, json.name, json.accessToken, json.refreshToken));
}
