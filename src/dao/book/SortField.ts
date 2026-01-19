export default class SortField {

    private _field: string;
	private _ordering: string;

    constructor(field: string, ordering: string) {
        this._field = field;
        this._ordering = ordering;
    }

    public get field() {
        return this._field;
    }

    public get ordering() {
        return this._ordering;
    }

}
