const VTComparisonFactory = require("../comparisons/vt-comparison-factory");
const VTRuleScopeFactory = require("../scopes/vt-rule-scope-factory");
const VTValueComparisonCondition = require("./vt-value-comparison-condition")

//Filter functions to simplify the counting process.
const blacklistedCardTypes = ['Deliverables', 'Question'];
const isWorkspace = (data)  => ('_doc' in data && 'groups' in data._doc) || 'groups' in data;
const isGroup = (data) => 'cards' in data;
const isCard = (data) => 'type' in data;
const isNotBlacklisted = (card) => blacklistedCardTypes.indexOf(card.type) == -1;
const isUnique = (value, index, self) => self.indexOf(value) == index;

module.exports = class VTCountUniqueStrategiesCondition extends VTValueComparisonCondition {
    getValue1(data) {
        if (isWorkspace(data)) return this.countUniqueStrategiesInEntireApproach(data);
        else if (isGroup(data)) return this.countUniqueStrategiesInOneGroup(data);
        else throw Error('unsupported data type: expected either a workspace or a single group.');
    }

    /**
     * Count the number of unique research strategies that are represented across the entire project approach.
     * @param {*} data The project approach to count strategies in.
     * @returns An integer, non-negative count of unique strategies.
     */
    countUniqueStrategiesInEntireApproach(data) {
        //check if data is a workspace.
        if (!isWorkspace(data)) return;
        const groups = data.groups.filter(isGroup);

        //Assemble a collection of distinct research strategies, excluding questions and deliverables.
        let distinctStrategies = [];
        for(let i in groups) {
            let group = groups[i];
            const distinctStrategiesInGroup = 
                group.cards
                     .filter(isCard)            //filter away non-card objects
                     .filter(isNotBlacklisted)  //filter away questions and deliverables
                     .map(x => x.type)          //flatten collection to card type
                     .filter(x => x);           //filter away null or undefined types
            distinctStrategies = distinctStrategies.concat(distinctStrategiesInGroup);
        }

        return distinctStrategies.filter(isUnique).length;
    }

    /**
     * Count the number of unique research strategies that are represented in a single group.
     * @param {*} data The group to count strategies in.
     * @returns An integer, non-negative count of unique strategies.
     */
    countUniqueStrategiesInOneGroup(data) {
        //check if data is a single group.
        if (!isGroup(data)) return;

        return data.cards
            .filter(isCard)             //filter away non-card objects
            .filter(isNotBlacklisted)   //filter away questions and deliverables
            .map(x => x.type)           //flatten collection to card types
            .filter(x => x)             //filter away null or undefined types
            .filter(isUnique)           //filter away non-unique types (first occurrence only)
            .length;
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
        return new VTCountUniqueStrategiesCondition(scope, comparison, parsedValue);
    }
}