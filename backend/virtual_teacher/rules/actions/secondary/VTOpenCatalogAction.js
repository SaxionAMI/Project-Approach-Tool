const VTRuleSecondaryAction = require("./VTRuleSecondaryAction");

module.exports = class VTOpenCatalogAction extends VTRuleSecondaryAction {
    constructor(catalogTab, displayText) {
        super('openCatalog', displayText);
        this.catalogTab = catalogTab;
    }

    static fromDbAction(action) {
        const catalogTab = action.attributes.find(x => x.key == 'catalogTab');
        const display = action.attributes.find(x => x.key == 'display');

        if (catalogTab == null || display == null) return null;
        return new VTOpenCatalogAction(catalogTab.value, display.value);
    }
}