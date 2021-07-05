const VTCountDeliverablesCondition = require("./vt-count-deliverables-condition")
const VTCountMethodsInStrategyCondition = require("./vt-count-methods-in-strategy-condition")
const VtCountResearchQuestionsCondition = require("./vt-count-research-questions-condition")
const VtCountTotalMethodsCondition = require("./vt-count-total-methods-condition")
const VTCountUniqueStrategiesCondition = require("./vt-count-unique-strategies-condition")
const VTTriangulationCondition = require("./vt-triangulation-condition")
const VTStrategyRepresentationCondition = require("./vt-strategy-representation-condition")
const VtBoolAndCondition = require("./vt-bool-and-condition")
const VtBoolOrCondition = require("./vt-bool-or-condition")

module.exports = class VTRuleConditionFactory {
    static fromDbRuleCondition(condition) {
        const result = this.makeCondition(condition);
        if (condition.condition1) {
            const condition1 = VTRuleConditionFactory.fromDbRuleCondition(condition.condition1);
            result.condition1 = condition1;
        }
        if (condition.condition2) {
            const condition2 = VTRuleConditionFactory.fromDbRuleCondition(condition.condition2);
            result.condition2 = condition2;
        }
        return result;
    }

    static makeCondition(condition) {
        switch(condition.type) {
            case "VtCountDeliverablesCondition": return VTCountDeliverablesCondition.fromDbRuleCondition(condition);
            case "VtCountMethodsInStrategyCondition": return VTCountMethodsInStrategyCondition.fromDbRuleCondition(condition);
            case "VtCountResearchQuestionsCondition": return VtCountResearchQuestionsCondition.fromDbRuleCondition(condition);
            case "VtCountTotalMethodsCondition": return VtCountTotalMethodsCondition.fromDbRuleCondition(condition);
            case "VtCountUniqueStrategiesCondition": return VTCountUniqueStrategiesCondition.fromDbRuleCondition(condition);
            case "VtStrategyRepresentationCondition": return VTTriangulationCondition.fromDbRuleCondition(condition);
            case "VtTriangulationCondition": return VTStrategyRepresentationCondition.fromDbRuleCondition(condition);
            case "VtBoolAndCondition": return VtBoolAndCondition.fromDbRuleCondition(condition);
            case "VtBoolOrCondition": return VtBoolOrCondition.fromDbRuleCondition(condition);
            default: return null;
        }
    }
}

    