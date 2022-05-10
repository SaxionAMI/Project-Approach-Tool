const VTRuleScope = require("./vt-rule-scope");

module.exports = class VTRuleCardScope extends VTRuleScope {
    evaluate(data) {
        return 'type' in data;
    }
}