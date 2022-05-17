import { DeepObject } from "../../deep-objects/deep-object";

export class VTRuleAttribute implements DeepObject<VTRuleAttribute>{
    key: string;
    value: string;

    constructor(parameters: IVTRuleAttribute) {
        this.key = parameters.key;
        this.value = parameters.value;
    }

    deepCopy() {
        return new VTRuleAttribute({
            key: this.key,
            value: this.value
        });
    }

    deepEquals(other: VTRuleAttribute) {
        if (this.key != other.key) return false;
        if (this.value != other.value) return false;
        return true;
    }

    static setValue(collection: VTRuleAttribute[], key: string, value: string) {
        const item = collection.find(x => x.key == key);
        if (item) {
            item.value = value;
        }
        else {
            collection.push(new VTRuleAttribute({key: key, value: value}));
        }
    }
}

export declare interface IVTRuleAttribute {
    key: string;
    value: string;
}