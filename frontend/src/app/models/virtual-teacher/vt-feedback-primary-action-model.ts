import { VTFeedbackSecondaryActionModel } from "./vt-feedback-secondary-action-model";

export class VTFeedbackPrimaryActionModel {
    type: string;
    secondaryAction: VTFeedbackSecondaryActionModel;
    message: string;
    severity: string;
    title: String;
    subtitle: String;
}