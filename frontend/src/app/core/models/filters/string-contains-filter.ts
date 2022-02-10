import { Filter } from "./filter.interface";

export class StringContainsFilter implements Filter {
    private _fieldSelector: Function;
    value: string = '';

    constructor(fieldSelector: Function) {
        this._fieldSelector = fieldSelector;
    }
    reset() {
        this.value = '';
    }

    cycle() {
        //
    }

    apply(collection: any) {
        if (!this.active) return collection;

        return collection.filter(x => {
            const field = this._fieldSelector(x);
            if (field && field.includes) {
                return field.toLowerCase().includes(this.value.toLowerCase());
            }
            else return false;
        });
    }

    get active() {
        return this.value && this.value.length > 0;
    }
    get state() {
        return this.active ? 1 : 0;
    }
    
}