export default class Series {
    private _id: number;
    private _title: string;

    public constructor(
        id: number,
        title: string
    ) {
        this._id = id;
        this._title = title;
    }

    public get id() {
        return this._id;
    }

    public get title() {
        return this._title;
    }
}