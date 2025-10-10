export default class Tag {
    private _id: number;
    private _name: string;

    public constructor(
        id: number,
        name: string
    ) {
        this._id = id;
        this._name = name;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }
}