const VTRuleScope = require("./vt-rule-scope")

module.exports = class VTRuleGroupScope extends VTRuleScope{
    evaluate(data) {
        return 'cards' in data;
    }
}