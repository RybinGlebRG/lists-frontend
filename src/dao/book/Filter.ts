export default class Filter {

    private _field: string;
    private _values: any[];

    constructor(field: string, values: any[]) {
        this._field = field;
        this._values = values;
    }

    public get field() {
        return this._field;
    }

    public get values() {
        return this._values;
    }

}
