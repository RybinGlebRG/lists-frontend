import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import type { RootState } from '../../redux/store'
import { jwtDecode } from "jwt-decode";
import User from '../../domain/user/User'
import * as UserRepository from '../../dao/user/UserRepository'
import store from '../../redux/store'
import {setUserData} from '../user/loginSlice'
import * as BaseRepository from '../base/BaseRepository'
import * as commonApi from '../../common/commonApi'
import {openSignIn} from '../../displayAreaSlice'


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

/**
 * Run fetch and check for errors. If got unauthorized error, then refresh tokens and try again (but only once)
 */
export async function fetchWithRetry(runfetch: (user: User) => Promise<Response>): Promise<Response> {

    // Run fetch
    let user = await UserRepository.getCurrentUser();
    let res = await runfetch(user);

    // If first unauthorized error
    if (isUnauthorizedError(res)) {

        // Then refresh tokens
        await BaseRepository.checkAndRefreshToken();
        
        // And try again
        user = await UserRepository.getCurrentUser();
        res = await runfetch(user);
    }

    // Check every other error
    await checkError(res);

    return res;
}

function isUnauthorizedError(result): boolean {
    return !result.ok && result.status === 401;
}

async function checkError(result){
    if (!result.ok){
        if (result.status===401){
            store.dispatch(openSignIn({}));
        } else {
            result=await result.json();
            let errorText=`${result.errorMessage}\\n
            ${result.error}
            `
            throw new Error(errorText);
        }
    };
}
