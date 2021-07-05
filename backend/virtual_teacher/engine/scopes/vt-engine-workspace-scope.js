const VTEngineCardScope = require("./vt-engine-card-scope");
const VTEngineGroupScope = require("./vt-engine-group-scope");

module.exports = class VTEngineWorkspaceScope {
    static forWorkspace(id) {
        return new VTEngineWorkspaceScope(id, [
            VTEngineGroupScope.wildcard()
        ]);
    }

    static forOneGroup(workspaceId, groupId) {
        return new VTEngineWorkspaceScope(workspaceId, [
            new VTEngineGroupScope(groupId, [
                VTEngineCardScope.wildcard()
            ])
        ]);
    }

    static forOneCard(workspaceId, groupId, cardId) {
        return new VTEngineWorkspaceScope(workspaceId, [
            new VTEngineGroupScope(groupId, [
                new VTEngineCardScope(cardId)
            ])
        ]);
    }
    
    constructor(id, children) {
        if (!('length' in children)) throw Error('VTEngineWorkspaceScope.children expects array, but found ' + typeof children);

        this.id = id;
        this.children = children;
    }

    appliesTo(workspace) {
        return workspace.id == this.id;
    }
}