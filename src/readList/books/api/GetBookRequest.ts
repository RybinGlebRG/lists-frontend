export default class GetBookRequest {

    private _userId: number;
    private _bookId: number;
    private _JWT: string;

    constructor(userId: number, bookId: number, JWT: string) {
            this._userId = userId;
            this._bookId = bookId;
            this._JWT = JWT;
        }


    public get userId() {
        return this._userId;
    }

    public get bookId() {
        return this._bookId;
    }

    public get JWT() {
        return this._JWT;
    }

}
