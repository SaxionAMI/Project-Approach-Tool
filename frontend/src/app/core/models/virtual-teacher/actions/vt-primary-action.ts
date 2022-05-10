import { VTAction } from "./vt-action";

export abstract class VTPrimaryAction extends VTAction {
    severity: string;
    ruleId: string
    
    constructor(ruleId: string, severity: string) {
        super();
        this.ruleId = ruleId;
        this.severity = severity;
    }

    abstract perform();
}