export default class GetBookRequest {

    private readonly _userId: number;
    private readonly _bookId: number;
    private readonly _JWT: string;
    private readonly _URL: string;
    private readonly _method: string = "GET";

    public constructor(userId: number, bookId: number, JWT: string) {
            this._userId = userId;
            this._bookId = bookId;
            this._JWT = JWT;
            this._URL = window.location.origin+`/api/v1/users/${userId}/books/${bookId}`
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

    public execute(): Promise<Response> {
        return fetch(
            this._URL,
            {
                method: this._method,
                headers: {
                    'Authorization': `Bearer ${this._JWT}`
                }
            }
        );
    }

}
