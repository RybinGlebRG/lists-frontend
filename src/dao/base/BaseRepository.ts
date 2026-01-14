import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import type { RootState } from '../../redux/store'
import { jwtDecode } from "jwt-decode";
import User from '../../domain/user/User'
import * as UserRepository from '../../dao/user/UserRepository'
import store from '../../redux/store'
import {setUserData} from '../user/loginSlice'


export async function checkAndRefreshToken() {
    const user: User = await UserRepository.getCurrentUser();

    const decoded = jwtDecode(user.accessToken);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded?.exp ?? 0);
    expirationDate.setMinutes(-5);

    if (new Date() > expirationDate) {
        let refreshedUser = await UserRepository.refreshUser(user);
        store.dispatch(setUserData({
            id: refreshedUser.id,
            name: refreshedUser.name,
            accessToken: refreshedUser.accessToken,
            refreshToken: refreshedUser.refreshToken
        }))
    }
    
}
