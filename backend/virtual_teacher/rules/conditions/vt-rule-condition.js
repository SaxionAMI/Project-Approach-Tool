const VTRuleScope = require("../scopes/vt-rule-scope");

module.exports = class VTRuleCondition {
    evaluate(data) {
        //override in derived classes!
        throw Error("function VTRuleCondition.Evaluate must be overridden in all derived types.");
    }    

    canBeEvaluated(data) {
        throw Error("function VTRuleCondition.Evaluate must be overridden in all derived types.")
    }
}