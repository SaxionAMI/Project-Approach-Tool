import { DeepObject } from "../../deep-objects/deep-object";

export class VTRuleFeedbackMode implements DeepObject<VTRuleFeedbackMode>{
    identifier: String;
    display: String;

    constructor(parameters: IVTRuleFeedbackMode) {
        this.identifier = parameters.identifier;
        this.display = parameters.display;
    }

    deepCopy() {
        return new VTRuleFeedbackMode({
            identifier: this.identifier,
            display: this.display
        });
    }

    deepEquals(other: VTRuleFeedbackMode): boolean {
        if (this.identifier != other.identifier) return false;
        return true;
    }
};

export declare interface IVTRuleFeedbackMode {
    identifier: String;
    display: String;
}