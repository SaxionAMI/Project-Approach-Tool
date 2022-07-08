const VTEngineCardScope = require("./vt-engine-card-scope");

const isGroup = (data) => 'cards' in data;
const _groupWildcardId = '*';
module.exports = class VTEngineGroupScope {
    static wildcard() {
        return new VTEngineGroupScope(_groupWildcardId, [
            VTEngineCardScope.wildcard()
        ]);
    }

    constructor(id, children) {
        this.id = id;
        this.children = children;
        if (children && !('length' in children)) {
            throw Error("VTEngineGroupScope.children expects array, but received " + typeof children);
        }
    }

    appliesTo(data) {
        if (!isGroup(data)) return false;
        return data.id == this.id || this.id == _groupWildcardId;
    }
}