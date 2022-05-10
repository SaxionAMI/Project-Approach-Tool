const VTRuleCondition = require("./vt-rule-condition");

module.exports = class VtRuleMultiCondition extends VTRuleCondition {
    constructor(condition1, condition2) {
        super()
        this.condition1 = condition1;
        this.condition2 = condition2;
    }

    evaluate(data) {
        const result1 = this.condition1.canBeEvaluated ? this.condition1.evaluate(data) : false;
        const result2 = this.condition2.canBeEvaluated ? this.condition2.evaluate(data) : false;
        return this.evaluateBool(result1, result2);
    }

    canBeEvaluated(data) {
        return this.condition1 != null && this.condition2 != null && this.canConditionsBeEvaluated(data);
    }

    canConditionsBeEvaluated(data) {
        throw Error("VTRuleMultiCondition.canConditionsBeEvaluated must be overridden in all derived types.");
    }

    evaluateBool(result1, result2) {
        throw Error("VTRuleMultiCondition.evaluateBool must be overridden in all derived types.");
    }
}