import { VTCatalogActionService } from "@app/workspace/services/virtual-teacher/vt-catalog-action/vt-catalog-action.service";
import { VTSecondaryAction } from "./vt-secondary-action";

export class VTActionOpenSearch extends VTSecondaryAction {
    searchPhrase: string;

    constructor(data: any, private _catalogService: VTCatalogActionService) {
        super(data.displayText);
        this.searchPhrase = data.searchPhrase;
    }

    perform() {
        this._catalogService.openSearchTab.emit(this);
    }
}