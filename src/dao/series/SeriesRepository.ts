import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect} from 'react';
import * as commonApi from '../../common/commonApi'
import {openSignIn} from '../../displayAreaSlice'

export default class SeriesRepository {
    
    private readonly _JWT: string;
    private readonly _userId: number;
    private readonly _onUnauthorized: () => void;

    public constructor(
        JWT: string,
        userId: number,
        onUnauthorized: () => void
    ) {
        this._JWT = JWT;
        this._userId = userId;
        this._onUnauthorized = onUnauthorized;
    }

    public async findAll() {
        let res = await fetch(window.location.origin+`/api/v1/users/${this._userId}/series`,
        {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${this._JWT}`
            }
        });
        await commonApi.checkError(res, this._onUnauthorized);
        
        let seriesList = await res.json();	

        return seriesList;	
    }
}
