const VTEngineGroupScope = require("./scopes/vt-engine-group-scope");
const VTEngineWorkspaceScope = require("./scopes/vt-engine-workspace-scope");

module.exports = class VTFeedbackGenerator {
    constructor(currentFeedbackMode) {
        this.currentFeedbackMode = currentFeedbackMode;
    }

    generateFeedback(data, rules, scope) {
        if (!(scope instanceof VTEngineWorkspaceScope)) {
            throw Error('Always pass VTEngineWorkspaceScope as root scope into VTFeedbackGenerator.');
        }
        if (!('length' in rules)) {
            throw Error('Always pass a collection of rules into VTFeedbackGenerator.');
        }
        return this.generateFeedbackForWorkspace(data, rules, scope);
    }

    generateFeedbackForWorkspace(workspace, rules, scope) {
        if (!('groups' in workspace)) {
            throw Error('VTFeedbackGenerator.generateFeedbackForWorkspace expects workspace with a collection \'groups\'.');
        }
        if (!(scope instanceof VTEngineWorkspaceScope)) {
            throw Error('VTFeedbackGenerator.generateFeedbackForWorkspace expects scope of type VTEngineWorkspaceScope, but found ' + typeof scope);
        }
        if (!workspace || !rules || !scope) return [];
        let feedback = [];
        if (scope.appliesTo(workspace)) {
            rules.forEach(x => {
                feedback.push(x.evaluate(this.currentFeedbackMode, workspace));
            });
        }

        scope.children.forEach(groupScope => {
            const appliesToGroups = workspace.groups.filter(x => groupScope.appliesTo(x));
            appliesToGroups.forEach(x => feedback = feedback.concat(this.generateFeedbackForGroup(x, rules, groupScope)));
        });

        return feedback.filter(x => x);
    }

    generateFeedbackForGroup(group, rules, scope) {
        if (!('cards' in group)) {
            throw Error('VTFeedbackGenerator.generateFeedbackForGroup expects group with a collection \'cards\'.');
        }
        if (!(scope instanceof VTEngineGroupScope)) {
            throw Error('VTFeedbackGenerator.generateFeedbackForGroup expects scope of type VTEngineGroupScope, but found ' + typeof scope);
        }
        if (!group || !rules || !scope) return [];
        let feedback = [];
        rules.forEach(x => {
            feedback.push(x.evaluate(this.currentFeedbackMode, group));
        });

        scope.children.forEach(cardScope => {
            const appliesToCards = group.cards.filter(x => cardScope.appliesTo(x));
            appliesToCards.forEach(x => feedback = feedback.concat(this.generateFeedbackForCard(x, rules)));
        })

        return feedback;
    }

    generateFeedbackForCard(card, rules) {
        if (!('type' in card)) {
            throw Error('VTFeedbackGenerator.generateFeedbackForCard expects card with a property \'type\'.');
        }
        if (!card || !rules) return [];
        let feedback = [];
        rules.forEach(x => feedback.push(x.evaluate(this.currentFeedbackMode, card)));
        return feedback;
    }
}