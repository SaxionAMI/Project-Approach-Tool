const VTRuleActionFactory = require("./actions/vt-rule-action-factory");
const VTRuleActionShowMetrics = require("./actions/VTRuleActionShowMetrics");
const VTRulePrimaryAction = require("./actions/VTRulePrimaryAction");
const VTRuleCondition = require("./conditions/vt-rule-condition");
const VTRuleConditionFactory = require("./conditions/vt-rule-condition-factory");
const VTRulePhase = require("./phases/VTRulePhase");

const isNotVtPhase = (x) => !(x instanceof VTRulePhase)
const isNotVtCondition = (x) => !(x instanceof VTRuleCondition);
const isNotVtRuleAction = (x) => !(x instanceof VTRulePrimaryAction);

/**
 * Represents a single modular, executable feedback rule. If given a 
 * project approach, the rule decides if its configured modular condition 
 * "passes" and, if so, generates a feedback item containing the configured 
 * modular action.
 */
module.exports = class VTRule {
    constructor(id, phases, condition, action) {
        //sanity checks
        if (phases.filter(isNotVtPhase).length > 0) throw Error(
            'One or more phases are invalid: expected value derived from type VTRulePhase.');

        if (isNotVtCondition(condition)) throw Error(
            'The given condition is invalid: expected value derived from type VTRuleCondition.');

        if (isNotVtRuleAction(action)) throw Error(
            'The given action is invalid: expected value derived from type VTRulePrimaryAction.');

        this.id = id;
        this.phases = phases;
        this.condition = condition;
        this.action = action;
    }

    evaluate(currentFeedbackMode, data) {
        //sanity checks
        if (!this.phases.find(x => x.identifier == currentFeedbackMode)) return;
        if (!this.condition.canBeEvaluated(data)) return undefined;

        const evaluationResult = this.condition.evaluate(data)
        if (!evaluationResult) return undefined;

        //Condition passed; create a feedback item.
        let dataType = 'groups' in data ? 'workspace' :
                    'cards' in data ? 'group' : 
                    'type' in data ? 'card' :
                    'unknown';
        const result = {
            ruleId: this.id,
            type: dataType,
            id: data.id,
            action: this.action
        }

        //In case of calculated metrics, we want the metrics to be sent to 
        //the client, so we pass the metrics as an additional parameter.
        //
        //We could have used a more generic solution here, but this isn't 
        //strictly necessary because ShowMetrics is currently the only action 
        //that expects such an additional parameter.
        if (result.action instanceof VTRuleActionShowMetrics) {
            result.action.metrics = evaluationResult;
        }
        return result;
    }

    static fromDbRule(dbRule) {
        const id = dbRule._id;
        const phases = dbRule.phases.map(x => VTRulePhase.fromDbRulePhase(x)).filter(x => x != null);
        const condition = VTRuleConditionFactory.fromDbRuleCondition(dbRule.condition);
        const action = VTRuleActionFactory.fromDbRuleAction(dbRule.action);

        if (id == undefined || id.length == 0 || phases.length == 0 || condition == null || action == null) return null;
        return new VTRule(id, phases, condition, action);
    }
}