import { DeepCollection } from "../../deep-objects/deep-collection";
import { DeepObject } from "../../deep-objects/deep-object";
import { NullableDeepObject } from "../../deep-objects/nullable-deep-object";
import { VTRuleAttribute } from "./vt-rule-attribute";

export class VTRuleAction implements DeepObject<VTRuleAction>{
    display: string;
    type: string;
    attributes: VTRuleAttribute[];
    secondaryAction?: VTRuleAction;

    constructor(parameters: IVTRuleAction) {
        this.display = parameters.display;
        this.type = parameters.type;
        this.attributes = parameters.attributes.map(x => new VTRuleAttribute(x));
        if (parameters.secondaryAction) {
            this.secondaryAction = new VTRuleAction(parameters.secondaryAction);
        }
    }

    deepCopy() {
        return new VTRuleAction({
            display: this.display,
            type: this.type,
            attributes: DeepCollection.deepCopy(this.attributes),
            secondaryAction: this.secondaryAction?.deepCopy() ?? undefined
        });
    }

    deepEquals(other: VTRuleAction): boolean {
        if (this.type != other.type) return false;
        else if (!DeepCollection.deepEquals(this.attributes, other.attributes)) return false;
        else if (!NullableDeepObject.deepEqualsOrNull(this.secondaryAction, other.secondaryAction)) return false;
        return true;
    }
}

export declare interface IVTRuleAction {
    display: string;
    type: string;
    attributes: VTRuleAttribute[];
    secondaryAction?: VTRuleAction;
}