import { Filter } from "./filter.interface";

export class FilterableCollection<T> {
    private _collection: T[];
    private _filters: Filter[];

    constructor(collection, filters) {
        this._collection = collection;
        this._filters = filters;
    }

    get items() {
        let result = this._collection;
        this._filters.forEach(x => {
            result = x.apply(result);
        })
        return result;
    }

    replaceItems(items: T[]) {
        this._collection = items;
    }
}