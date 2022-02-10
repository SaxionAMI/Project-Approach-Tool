import { VTSecondaryAction } from "./secondary/vt-secondary-action";
import { VTPrimaryAction } from "./vt-primary-action";
import { VTActionFactory } from "./vt-action-factory";

export class VTActionShowMetrics extends VTPrimaryAction {   

    private _metrics: any;
    private _secondaryAction: VTSecondaryAction;

    constructor(ruleId: string, data: any, actionFactory: VTActionFactory) {
        super(ruleId, data.severity);
        this._metrics = data.metrics;
        this._secondaryAction = actionFactory.makeSecondary(data.secondaryAction)
    }

    get metrics(): any {
        return this._metrics;
    }

    get secondaryAction() {
        return this._secondaryAction;
    }

    perform() {
        ; //no action to perform
    }
}