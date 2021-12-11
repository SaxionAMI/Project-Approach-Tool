import { VTCatalogActionService } from "src/app/workspace/services/virtual-teacher/vt-catalog-action/vt-catalog-action.service";
import { VTSecondaryAction } from "./vt-secondary-action";

export class VTActionOpenCatalog extends VTSecondaryAction {
    private _catalogTab: string;

    get catalogTab() {
        return this._catalogTab;
    }

    constructor(data: any, private _catalogService: VTCatalogActionService) {
        super(data.displayText)
        this._catalogTab = data.catalogTab;
    }

    perform() {
        this._catalogService.openCatalogTab.emit(this);
    }
};