const VTRuleScope = require("./vt-rule-scope");

module.exports = class VTRuleWorkspaceScope extends VTRuleScope{
    evaluate(data) {
        return 'groups' in data;
    }
}