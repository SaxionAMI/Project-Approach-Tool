import { VTAction } from "../vt-action";

export abstract class VTSecondaryAction extends VTAction {
    displayText: string;

    constructor(displayText: string) {
        super();
        this.displayText = displayText;
    }

    abstract perform();
}