module.exports = class VTConditionChecks {
    static isWorkspace(data) {
        return ('_doc' in data && 'groups' in data._doc) || 'groups' in data;
    }
    static isGroup(data) { 
        return 'cards' in data;
    }
    static isCard(data){
        return 'type' in data;
    }
}