export class BookStatus {

    private _statusId: number;
    private _statusName: string;

    public constructor(
        statusId: number,
        statusName: string
    ) {
        this._statusId = statusId;
        this._statusName = statusName;


    }

    public get statusId() {
        return this._statusId;
    }

    public get statusName() {
        return this._statusName;
    }

}
