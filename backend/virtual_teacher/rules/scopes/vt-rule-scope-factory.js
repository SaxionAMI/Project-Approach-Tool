const VTRuleGroupScope = require("./vt-rule-group-scope");
const VTRuleWorkspaceScope = require("./vt-rule-workspace-scope")
const VTRuleCardScope = require("./vt-rule-card-scope")

module.exports = class VTRuleScopeFactory {
    static fromType(type) {
        switch(type) {
            case 'workspace': return new VTRuleWorkspaceScope();
            case 'group': return new VTRuleGroupScope();
            case 'card': return new VTRuleCardScope();
            default: return null;
        }
    }
}
