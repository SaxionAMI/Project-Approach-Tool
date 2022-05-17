const VtRuleMultiCondition = require("./vt-rule-multi-condition");

/**
 * Returns the logical OR result of two conditions (evaluates to TRUE when either one or both conditions evaluate to TRUE).
 */
module.exports = class VTBoolOrCondition extends VtRuleMultiCondition {
    evaluateBool(result1, result2) {
        return result1 || result2;
    }

    static fromDbRuleCondition(condition) {
        return new VTBoolOrCondition(null, null);
    }

    canConditionsBeEvaluated(data) {
        return this.condition1.canBeEvaluated(data) || this.condition2.canBeEvaluated(data)
    }
}