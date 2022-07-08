import { VTSecondaryAction } from "./secondary/vt-secondary-action";
import { VTPrimaryAction } from "./vt-primary-action";
import { VTActionFactory } from "./vt-action-factory";
import { VTFeedbackBubbleService } from "src/app/workspace/services/virtual-teacher/vt-feedback-bubble/vt-feedback-bubble.service";

export class VTActionFeedbackBubble extends VTPrimaryAction {
    private _title: string;
    private _subtitle: string;
    private _message: string;
    private _secondaryAction: VTSecondaryAction;

    get title() { return this._title; }
    get subtitle() { return this._subtitle; }
    get message() { return this._message; }
    get secondaryAction() { return this._secondaryAction; }

    constructor(ruleId: string, data: any, private _feedbackService: VTFeedbackBubbleService, actionFactory: VTActionFactory) {
        super(ruleId, data.severity);
        this._title = data.title;
        this._subtitle = data.subtitle;
        this._message = data.message;
        this._secondaryAction = actionFactory.makeSecondary(data.secondaryAction);
    }

    perform() {
        this._feedbackService.showFeedback.emit(this);
    }
}