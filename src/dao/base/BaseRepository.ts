import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import type { RootState } from '../../redux/store'
import { jwtDecode } from "jwt-decode";
import User from '../../domain/user/User'
import * as UserRepository from '../../dao/user/UserRepository'


export async function checkAndRefreshToken() {
    const user: User = await UserRepository.getCurrentUser();

    const decoded = jwtDecode(user.token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded?.exp ?? 0);
    expirationDate.setMinutes(-5);

    if (new Date() > expirationDate) {
        alert("Token is exired!");
        // TODO: refresh token
    }
    
}
