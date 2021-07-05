const VTComparison = require("../comparisons/vt-comparison");
const VTRuleScope = require("../scopes/vt-rule-scope");
const VTRuleCondition = require("./vt-rule-condition");

module.exports = class VTValueComparisonCondition extends VTRuleCondition{
    constructor(scope, comparison, value2) {
        super();

        if (!scope instanceof VTRuleScope) throw Error("VTRuleCondition.scope expects value of class VTRuleScope.");
        this._scope = scope;

        if (!comparison instanceof VTComparison) throw Error("VTValueComparisonCondition.comparison expects a value of class VTComparison.")
        this.comparison = comparison;

        this.value2 = value2;
    }
    
    get scope() {
        return this._scope;
    }

    evaluate(data) {
        let value1 = this.getValue1(data);
        return this.comparison.compare(value1, this.value2);
    }

    getValue1(data) {
        throw Error("function VTValueComparisonCondition.getValue1 must be overridden in all derived classes.");
    }

    canBeEvaluated(data) {
        return this.isInScope(data);
    }

    isInScope(data) {
        return this.scope.evaluate(data);
    }
}