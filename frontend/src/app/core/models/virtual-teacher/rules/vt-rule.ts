import { DeepCollection } from "../../deep-objects/deep-collection";
import { DeepObject } from "../../deep-objects/deep-object";
import { NullableDeepObject } from "../../deep-objects/nullable-deep-object";
import { VTRuleAction } from "./vt-rule-action";
import { VTRuleCondition } from "./vt-rule-condition";
import { VTRuleFeedbackMode } from "./vt-rule-feedback-mode";

export class VTRule implements DeepObject<VTRule>{
    _id: string;
    title: string;
    description: string;
    phases: VTRuleFeedbackMode[];
    condition: VTRuleCondition;
    action: VTRuleAction;
    enabled: boolean;
    configurable: boolean;

    constructor(parameters: IVTRule) {
        this._id = parameters._id;
        this.title = parameters.title;
        this.description = parameters.description;
        this.phases = parameters.phases.map(x => new VTRuleFeedbackMode(x));
        if (parameters.condition) {
            this.condition = new VTRuleCondition(parameters.condition);
        }
        if (parameters.action) {
            this.action = new VTRuleAction(parameters.action);
        }
        this.enabled = parameters.enabled;
        this.configurable = parameters.configurable;
    }

    deepCopy(): VTRule {
        return new VTRule({
            _id: this._id,
            description: this.description,
            phases: this.phases.map(x => x.deepCopy()),
            condition: this.condition?.deepCopy() ?? null,
            action: this.action?.deepCopy() ?? null,
            enabled: this.enabled,
            title: this.title,
            configurable: this.configurable
        });
    }

    deepEquals(other: VTRule): boolean {
        console.log(this, other);

        if (other._id != this._id) return false;
        if (other.title != this.title) return false;
        if (other.description != this.description) return false;
        if (this.phases.length != other.phases.length) return false;
        if (!DeepCollection.deepEquals(this.phases, other.phases)) return false;
        if (!NullableDeepObject.deepEqualsOrNull(this.condition, other.condition)) return false;
        if (!NullableDeepObject.deepEqualsOrNull(this.action, other.action)) return false;
        if (this.enabled != other.enabled) return false;

        return true;
    }
}

export declare interface IVTRule {
    _id: string;
    title: string;
    description: string;
    phases: VTRuleFeedbackMode[];
    condition: VTRuleCondition;
    action: VTRuleAction;
    enabled: boolean;
    configurable: boolean;
}