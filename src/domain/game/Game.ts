export default class Movie {
    private _id: number;
    private _name: string;
    private _createDateUTC: Date;

    public constructor(
        id: number,
        name: string,
        createDateUTC: Date
    ) {
        this._id = id;
        this._name = name;
        this._createDateUTC = createDateUTC;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get createDateUTC() {
        return this._createDateUTC;
    }
}
