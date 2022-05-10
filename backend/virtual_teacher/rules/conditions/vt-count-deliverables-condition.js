const VTComparisonFactory = require("../comparisons/vt-comparison-factory");
const VTRuleScopeFactory = require("../scopes/vt-rule-scope-factory");
const VTValueComparisonCondition = require("./vt-value-comparison-condition");

const isWorkspace = (data)  => ('_doc' in data && 'groups' in data._doc) || 'groups' in data;
const isGroup = (data) => 'cards' in data;
const isCard = (data) => 'type' in data;
const isDeliverable = (data) => data.type == 'Deliverables';

/**
 * A rule condition that counts the total number of deliverables.
 */
module.exports = class VTCountDeliverablesCondition extends VTValueComparisonCondition{

    getValue1(data) {
        if (isWorkspace(data)) return this.countMethodsInWorkspace(data);
        else if (isGroup(data)) return this.countMethodsInOneGroup(data);
        else return 0;
    }

    /**
     * Count the number of deliverables in the entire workspace.
     * @param {*} data The workspace to count deliverables in.
     * @returns The count.
     */
    countMethodsInWorkspace(data) {
        let count = 0;

        for(let group_i in data.groups) {
            const group = data.groups[group_i];
            if (!isGroup(grouo)) continue;
            count += group.cards.filter(x => isCard(x) && isDeliverable(x)).length;
        }
        return count;
    }

    /**
     * Count the number of deliverables in a single group ("project phase").
     * @param {*} data The group to count deliverables in.
     * @returns The count.
     */
    countMethodsInOneGroup(data) {
        return data.cards.filter(x => isCard(x) && isDeliverable(x)).length;
    }

    static fromDbRuleCondition(condition) {
        const scopeType = condition.attributes.find(x => x.key == 'scope');
        const comparisonType = condition.attributes.find(x => x.key == 'comparison');
        const value = condition.attributes.find(x => x.key == 'value');
        if (scopeType == null || comparisonType == null || value == null || value == null) return null;

        const scope = VTRuleScopeFactory.fromType(scopeType.value);
        const comparison = VTComparisonFactory.fromType(comparisonType.value);
        const parsedValue = parseInt(value.value, 10)

        if (scope == null || comparison == null || isNaN(parsedValue)) return null;
        return new VTCountDeliverablesCondition(scope, comparison, parsedValue);
    }
}