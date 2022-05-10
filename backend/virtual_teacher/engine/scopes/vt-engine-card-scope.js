const _cardWildcardId = '*';
const isCard = (data) => 'type' in data;
module.exports = class VTEngineCardScope {
    static wildcard() {
        return new VTEngineCardScope(_cardWildcardId);
    }

    constructor(id) {
        this.id = id;
    }

    appliesTo(data) {
        if (!isCard(data)) return false;
        return this.id == data.id || this.id == _cardWildcardId;
    }
}