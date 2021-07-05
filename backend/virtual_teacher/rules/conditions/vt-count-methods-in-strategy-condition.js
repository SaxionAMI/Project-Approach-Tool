const VTComparisonFactory = require("../comparisons/vt-comparison-factory");
const VTRuleScopeFactory = require("../scopes/vt-rule-scope-factory");
const VTValueComparisonCondition = require("./vt-value-comparison-condition");

const isWorkspace = (data)  => ('_doc' in data && 'groups' in data._doc) || 'groups' in data;
const isGroup = (data) => 'cards' in data;
const isCard = (data) => 'type' in data;

/**
 * A rule condition that counts the total number of research activities of a given research strategy
 */
module.exports = class VTCountMethodsInStrategyCondition extends VTValueComparisonCondition{
    /**
     * Make a new condition.
     * @param {*} scope The engine scope that this condition is checked on.
     * @param {*} comparison The comparison that is performed against the count.
     * @param {*} value2 The value that the count is compared with.
     * @param {*} strategy The strategy to count activities of.
     */
    constructor(scope, comparison, value2, strategy) {
        super(scope, comparison, value2);

        this.strategy = strategy;
    }

    getValue1(data) {
        if (isWorkspace(data)) return this.countMethodsInWorkspace(data);
        else if (isGroup(data)) return this.countMethodsInOneGroup(data);
        else return 0;
    }

    /**
     * Count the number of research activities of a given strategy in the entire workspace.
     * @param {*} data The workspace to count activities in.
     * @returns The count.
     */
    countMethodsInWorkspace(data) {
        let count = 0;

        

        //technically N-squared complexity, but given the small data size this won't be an issue for now.
        for(let group_i in data.groups) {
            const group = data.groups[group_i];
            if (!isGroup(group)) continue;
        
            console.log(this.strategy);
            console.log(group.cards);

            count += group.cards.filter(x => isCard(x) && x.type == this.strategy).length;
        }
        return count;
    }

    /**
     * Count the number of research activities of a given strategy in a single group ("project phase").
     * @param {*} data The group to count activities in.
     * @returns The count.
     */
    countMethodsInOneGroup(data) {
        return data.cards.filter(x => isCard(x) && x.type == this.strategy).length;
    }

    static fromDbRuleCondition(condition) {
        const scopeType = condition.attributes.find(x => x.key == 'scope');
        const comparisonType = condition.attributes.find(x => x.key == 'comparison');
        const value = condition.attributes.find(x => x.key == 'value');
        const strategyType = condition.attributes.find(x => x.key == 'strategy');
        if (scopeType == null || comparisonType == null || value == null || value == null || strategyType == null) return null;

        const scope = VTRuleScopeFactory.fromType(scopeType.value);
        const comparison = VTComparisonFactory.fromType(comparisonType.value);
        const strategy = strategyType.value;
        const parsedValue = parseInt(value.value, 10)

        if (scope == null || comparison == null || isNaN(parsedValue) || strategy == null) return null;
        return new VTCountMethodsInStrategyCondition(scope, comparison, parsedValue, strategy);
    }
}