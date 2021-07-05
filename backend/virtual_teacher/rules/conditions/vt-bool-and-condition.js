const VtRuleMultiCondition = require("./vt-rule-multi-condition");

/**
 * Returns the logical AND result of two conditions (only evaluates to TRUE when both conditions evaluate to TRUE).
 */
module.exports = class VTBoolAndCondition extends VtRuleMultiCondition {
    evaluateBool(result1, result2) {
        return result1 && result2;
    }

    static fromDbRuleCondition(condition) {
        return new VTBoolAndCondition(null, null);
    }

    canConditionsBeEvaluated(data) {
        return this.condition1.canBeEvaluated(data) && this.condition2.canBeEvaluated(data)
    }
}