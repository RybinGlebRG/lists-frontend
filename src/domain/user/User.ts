export default class User {
    private _id: number;
    private _name: string;
    private _accessToken: string;
    private _refreshToken: string;

    public constructor(
        id: number,
        name: string,
        accessToken: string,
        refreshToken: string
    ) {
        this._id = id;
        this._name = name;
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get accessToken() {
        return this._accessToken;
    }

    public get refreshToken() {
        return this._refreshToken;
    }
}