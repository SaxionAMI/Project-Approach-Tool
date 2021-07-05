import { DeepCollection } from "../../deep-objects/deep-collection";
import { DeepObject } from "../../deep-objects/deep-object";
import { NullableDeepObject } from "../../deep-objects/nullable-deep-object";
import { VTRuleAttribute } from "./vt-rule-attribute";

export class VTRuleCondition implements DeepObject<VTRuleCondition>{
    type: string;
    display: string;
    attributes: VTRuleAttribute[];
    condition1: VTRuleCondition;
    condition2: VTRuleCondition;
    description: string;

    get isMultiCondition() { 
        return this.condition1 && this.condition2 
    }

    constructor(parameters: IVTRuleCondition) {
        this.type = parameters.type;
        this.display = parameters.display;
        this.attributes = parameters.attributes.map(x => new VTRuleAttribute(x));
        if (parameters.condition1) {
            this.condition1 = new VTRuleCondition(parameters.condition1);
        }
        if (parameters.condition2) {
            this.condition2 = new VTRuleCondition(parameters.condition2);
        }
        this.description = parameters.description;
    }

    deepCopy() {
        return new VTRuleCondition({
            type: this.type,
            display: this.display,
            attributes: DeepCollection.deepCopy(this.attributes),
            condition1: this.condition1,
            condition2: this.condition2,
            description: this.description
        });
    }

    deepEquals(other: VTRuleCondition): boolean {
        if (this.type != other.type) return false;
        if (!NullableDeepObject.deepEqualsOrNull(this.condition1, other.condition1)) return false;
        if (!NullableDeepObject.deepEqualsOrNull(this.condition2, other.condition2)) return false;
        if (!DeepCollection.deepEquals(this.attributes, other.attributes)) return false;
        return true;
    }

    
};

export declare interface IVTRuleCondition {
    type: string;
    display: string;
    attributes: VTRuleAttribute[];
    condition1: VTRuleCondition;
    condition2: VTRuleCondition;
    description: string;
}