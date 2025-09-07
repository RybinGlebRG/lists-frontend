export default class BookType {

    private _typeId: number;
    private _typeName: string;

    public constructor(
        typeId: number,
        typeName: string
    ) {
        this._typeId = typeId;
        this._typeName = typeName;
    }

    public get typeId() {
        return this._typeId;
    }

    public get typeName() {
        return this._typeName;
    }
}
