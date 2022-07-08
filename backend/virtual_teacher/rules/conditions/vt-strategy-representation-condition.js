const VTRuleWorkspaceScope = require("../scopes/vt-rule-workspace-scope");
const VTRuleCondition = require("./vt-rule-condition");

const isWorkspace = (data)  => ('_doc' in data && 'groups' in data._doc) || 'groups' in data;
const isGroup = (data) => 'cards' in data;

module.exports = class VTStrategyRepresentationCondition extends VTRuleCondition{
    constructor() {
        super();
        this._scope = new VTRuleWorkspaceScope();
    }

    /**
     * Calculates strategy representation in the given data. Always evaluates to truthy.
     * @param {*} data The data to calculate on.
     * @returns Strategy representation including total and context information.
     */
    evaluate(data) {
        if (isWorkspace(data)) return this.calculateStrategyRepresentationInWorkspace(data);
        else if (isGroup(data)) return this.calculateStrategyRepresentationInGroup(data);
    }

    canBeEvaluated(data) {
        return this._scope.evaluate(data);
    }

    calculateStrategyRepresentationInWorkspace(data) {
        let lab = 0;
        let workshop = 0;
        let library = 0;
        let field = 0;
        let showroom = 0;

        for(let group_i in data.groups) {
            const group = data.groups[group_i];
            for(let card_i in group.cards) {
                const card = group.cards[card_i];
                switch(card.type) {
                    case 'Lab': 
                        lab++;
                        break;
                    case 'Field':
                        field++;
                        break;
                    case 'Library':
                        library++;
                        break;
                    case 'Workshop':
                        workshop++;
                        break;
                    case 'Showroom':
                        showroom++;
                        break;
                    default: continue;
                }
            }
        }

        return {
            field: field,
            library: library,
            workshop: workshop,
            lab: lab,
            showroom: showroom,
            total: field + library + workshop + lab + showroom,
            scope: 'workspace',
            id: data._id,
            type: 'strategies'
        }
    }

    calculateStrategyRepresentationInGroup(data) {
        let lab = 0;
        let workshop = 0;
        let library = 0;
        let field = 0;
        let showroom = 0;

        for(let card_i in data.cards) {
            const card = data.cards[card_i];
            switch(card.type) {
                case 'Lab': 
                    lab++;
                    break;
                case 'Field':
                    field++;
                    break;
                case 'Library':
                    library++;
                    break;
                case 'Workshop':
                    workshop++;
                    break;
                case 'Showroom':
                    showroom++;
                    break;
                default: continue;
            }
        }

        return {
            field: field,
            library: library,
            workshop: workshop,
            lab: lab,
            showroom: showroom,
            total: field + library + workshop + lab + showroom,
            scope: 'group',
            id: data._id,
            title: data.title,
            type: 'strategies'
        }
    }

    static fromDbRuleCondition(condition) {
        return new VTStrategyRepresentationCondition();
    }
}