export default class User {
    private _id: number;
    private _name: string;
    private _token: string;

    public constructor(
        id: number,
        name: string,
        token: string
    ) {
        this._id = id;
        this._name = name;
        this._token = token;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get token() {
        return this._token;
    }
}