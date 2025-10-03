export default class Tag {
    private _id: number;

    public constructor(
        id: number
    ) {
        this._id = id;
    }

    public get id() {
        return this._id;
    }
}