const VTRuleSecondaryAction = require("./VTRuleSecondaryAction");

module.exports = class VTOpenSearchAction extends VTRuleSecondaryAction {
    constructor(searchPhrase, displayText) {
        super('openSearch', displayText);
        this.searchPhrase = searchPhrase;
    }

    static fromDbAction(action) {
        const searchPhrase = action.attributes.find(x => x.key == 'searchPhrase');
        const display = action.attributes.find(x => x.key == 'display');

        if (searchPhrase == null || display == null) return null;
        return new VTOpenSearchAction(searchPhrase.value, display.value);
    }
}