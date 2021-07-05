const VTRulePrimaryAction = require("./VTRulePrimaryAction");

module.exports = class VTRuleActionShowMetrics extends VTRulePrimaryAction{    
    constructor(secondaryAction) {
        super('showMetrics', secondaryAction, 'metrics');
        this.metrics = undefined;
    }

    static fromDbAction(action) {
        return new VTRuleActionShowMetrics(null);
    }
}