const VTRuleWorkspaceScope = require("../scopes/vt-rule-workspace-scope");
const VTConditionChecks = require("./checks");
const VTRuleCondition = require("./vt-rule-condition");

module.exports = class VTTriangulationCondition extends VTRuleCondition {
    constructor() {
        super();
        this._scope = new VTRuleWorkspaceScope();
    }

    /**
     * Calculates the representation of each consideration of the DOT framework in the given data.
     * @param {*} data 
     * @returns Triangulation metrics including scope and context information to make sense of it all.
     */
    evaluate(data) {
        if (VTConditionChecks.isWorkspace(data)) {
            return this.calculateTriangulationMetricsInWorkspace(data);
        }
        else if (VTConditionChecks.isGroup(data)) {
            return this.calculateTriangulationMetricsInGroup(data);
        }
        else return undefined;
    }
    
    canBeEvaluated(data) {
        return this._scope.evaluate(data);
    }

    calculateTriangulationMetricsInWorkspace(data) {
        let result = {
            overview: 0, 
            certainty: 0, 
            fit: 0, 
            expertise: 0,
            scope: 'workspace',
            id: data._id,
            type: 'triangulation'
        };
        //Is there any way we can calculate data <-> inspiration as well?

        for(let group_i in data.groups) {
            const group = data.groups[group_i];
            for(let card_i in group.cards) {
                const card = group.cards[card_i];
                const considerations = this.getConsiderationsForStrategy(card.type);
                if (!considerations) continue;
                result.overview += considerations.overview;
                result.certainty += considerations.certainty;
                result.fit += considerations.fit;
                result.expertise += considerations.expertise;
            }
        }

        return result;
    }

    calculateTriangulationMetricsInGroup(data) {
        let result = {
            overview: 0, 
            certainty: 0, 
            fit: 0, 
            expertise: 0,
            scope: 'group',
            id: data.id,
            title: data.title,
            type: 'triangulation'
        };
        //Is there any way we can calculate data <-> inspiration as well?

        for(let card_i in data.cards) {
            const card = data.cards[card_i];
            const considerations = this.getConsiderationsForStrategy(card.type);
            if (!considerations) continue;
            result.overview += considerations.overview;
            result.certainty += considerations.certainty;
            result.fit += considerations.fit;
            result.expertise += considerations.expertise;
        }

        return result;
    }

    getConsiderationsForStrategy(strategy) {
        switch(strategy) {
            case 'Field': return {overview: 1, certainty: 0, fit: 1, expertise: 0};
            case 'Library': return {overview: 1, certainty: 0, fit: 0, expertise: 1};
            case 'Workshop': return {overview: 0.5, certainty: 0.5, fit: 0.5, expertise: 0.5};
            case 'Lab': return {overview: 0, certainty: 1, fit: 1, expertise: 0};
            case 'Showroom': return {overview: 0, certainty: 1, fit: 0, expertise: 1};
            default: return undefined;
        }
    }

    static fromDbRuleCondition(condition) {
        return new VTTriangulationCondition();
    }
}