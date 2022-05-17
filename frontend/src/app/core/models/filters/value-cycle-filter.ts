import { Filter } from "./filter.interface";

export class ValueCycleFilter implements Filter {
    name: string;
    private _values: string[];
    private _fieldSelector: Function;

    constructor(fieldSelector, values) {
        this._values = values;
        this._fieldSelector = fieldSelector;
    }
    reset() {
        this.state = 0;
    }

    cycle() {
        this.state++;
        if (this.state > this._values.length) this.state = 0;
    }

    apply(collection: any) {
        if (this.state == 0) return collection;
        return collection.filter(x => {
            const field = this._fieldSelector(x);
            const currentValue = this._values[this.state - 1];
            return field == currentValue;
        })
    }

    active: boolean;
    state: number = 0;
    
}