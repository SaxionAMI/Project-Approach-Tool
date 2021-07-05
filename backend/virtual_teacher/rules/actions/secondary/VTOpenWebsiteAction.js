const VTRuleSecondaryAction = require("./VTRuleSecondaryAction");

module.exports = class VTOpenWebsiteAction extends VTRuleSecondaryAction {
    constructor(url, displayText) {
        super('openWebsite', displayText);
        this.url = url;
    }

    static fromDbAction(action) {
        const url = action.attributes.find(x => x.key == 'url');
        const display = action.attributes.find(x => x.key == 'display');

        if (url == null || display == null) return null;
        return new VTOpenWebsiteAction(url.value, display.value);
    }
}