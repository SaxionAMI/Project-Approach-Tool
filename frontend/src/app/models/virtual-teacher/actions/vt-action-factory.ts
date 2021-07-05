import { Injectable } from "@angular/core";
import { VTFeedbackBubbleService } from "src/app/services/virtual-teacher/vt-feedback-bubble/vt-feedback-bubble.service";
import { VTCatalogActionService } from "src/app/services/virtual-teacher/vt-catalog-action/vt-catalog-action.service";
import { VTFeedbackPrimaryActionModel } from "../vt-feedback-primary-action-model";
import { VTFeedbackSecondaryActionModel } from "../vt-feedback-secondary-action-model";
import { VTActionOpenCatalog } from "./secondary/vt-action-open-catalog";
import { VTActionOpenSearch } from "./secondary/vt-action-open-search";
import { VTActionOpenWebsite } from "./secondary/vt-action-open-website";
import { VTSecondaryAction } from "./secondary/vt-secondary-action";
import { VTActionFeedbackBubble } from "./vt-action-feedback-bubble";
import { VTActionShowMetrics } from "./vt-action-show-metrics";
import { VTPrimaryAction } from './vt-primary-action';

@Injectable({
    providedIn: 'root'
})
export class VTActionFactory {
    constructor(private _feedbackService: VTFeedbackBubbleService, private _catalogService: VTCatalogActionService) {}

    /**
     * Create a new primary-level VT feedback action based on the given feedback action model.
     * @param action The action model to base the feedback action on.
     * @param constructor_params Any extra constructor parameters passed to the action.
     * @returns A performable feedback action
     */
    makePrimary(ruleId: string, action: VTFeedbackPrimaryActionModel): VTPrimaryAction {
        switch(action.type) {
            case 'feedbackBubble': 
                return new VTActionFeedbackBubble(ruleId, action, this._feedbackService, this);
            case 'showMetrics':
                return new VTActionShowMetrics(ruleId, action, this);
            default: return undefined;
        }
    }

    /**
     * Create a new secondary-level VT feedback action based on the given feedback action model. 
     * Secondary actions can be triggered as follow-up actions of a primary action.
     * @param action The secondary action model to base the feedback action on.
     * @param constructor_params Any extra constructor parameters passed to the action.
     * @returns A performable feedback action
     */
    makeSecondary(action: VTFeedbackSecondaryActionModel): VTSecondaryAction {
        if (action == undefined) return undefined;
        switch(action.type) {
            case 'openCatalog': return new VTActionOpenCatalog(action, this._catalogService);
            case 'openSearch': return new VTActionOpenSearch(action, this._catalogService);
            case 'openWebsite': return new VTActionOpenWebsite(action);
            default: return undefined;
        }
    }
}