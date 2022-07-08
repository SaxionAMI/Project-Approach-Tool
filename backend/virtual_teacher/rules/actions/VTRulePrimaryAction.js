module.exports = class VTRulePrimaryAction {
    constructor(type, secondaryAction, severity) {
        this.type = type;
        this.secondaryAction = secondaryAction;
        this.severity = severity;
    }
}