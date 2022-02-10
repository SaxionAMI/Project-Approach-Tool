import { VTSecondaryAction } from "./vt-secondary-action";

export class VTActionOpenWebsite extends VTSecondaryAction {
    url: string;

    constructor(data: any) {
        super(data.displayText);
        this.url = data.url;
    }

    perform() {
        window.open(this.url, '_blank');
    }
}