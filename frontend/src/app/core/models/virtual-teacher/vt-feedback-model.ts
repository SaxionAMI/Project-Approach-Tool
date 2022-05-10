import { VTFeedbackPrimaryActionModel } from "./vt-feedback-primary-action-model";

export class VTFeedbackModel {
    static TYPE_WORKSPACE: string = 'workspace';
    static TYPE_GROUP: string = 'group';
    static TYPE_CARD: string = 'card';
    type: string;
    id: string;
    action: VTFeedbackPrimaryActionModel;
    ruleId: string;
}