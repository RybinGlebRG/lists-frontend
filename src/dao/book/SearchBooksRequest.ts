import Filter from "./Filter";
import SortField from "./SortField";

export default class SearchBooksRequest {

    private _sort: SortField[];
	private _isChainBySeries: boolean;
	private _filters: Filter[];

    constructor(sort: SortField[], isChainBySeries: boolean, filters: Filter[]) {
        this._sort = sort;
        this._isChainBySeries = isChainBySeries;
        this._filters = filters;
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

}

