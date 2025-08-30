import Filter from "./Filter";
import SortField from "./SortField";

export default class SearchBooksRequest {

    private _userId: number;
    private _sort: SortField[];
	private _isChainBySeries: boolean;
	private _filters: Filter[];
    private _JWT: string;

    constructor(userId: number, sort: SortField[], isChainBySeries: boolean, filters: Filter[], JWT: string) {
        this._userId = userId;
        this._sort = sort;
        this._isChainBySeries = isChainBySeries;
        this._filters = filters;
        this._JWT = JWT;
    }

    public toJsonBody(): string {
        const body = {
            sort: this._sort.map(item => {
                return {
                    "field": item.field,
                    "ordering": item.ordering
                }
            }),
            isChainBySeries: this._isChainBySeries,
            filters: this._filters.map(filter => {
                return {
                    "field": filter.field,
                    "values": filter.values
                }
            })
        }

        return JSON.stringify(body);
    }

    public get userId() {
        return this._userId;
    }

    public get JWT() {
        return this._JWT;
    }

}

