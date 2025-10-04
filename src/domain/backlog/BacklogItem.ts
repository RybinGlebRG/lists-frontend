export default class BacklogItem {

    private _id: number;
    private _title: string;
    private _typeId: number;
    private _note: string;
    private _creationDate: Date;

    public constructor(
        id: number,
        title: string,
        typeId: number,
        note: string,
        creationDate: Date
    ) {
        this._id = id;
        this._title = title;
        this._typeId = typeId;
        this._note = note;
        this._creationDate = creationDate;
    }

    public get id() {
        return this._id;
    }

    public get title() {
        return this._title;
    }

    public get typeId() {
        return this._typeId;
    }

    public get note() {
        return this._note;
    }

    public get creationDate() {
        return this._creationDate;
    }

}
