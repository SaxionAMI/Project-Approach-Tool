module.exports = class VTRulePhase {
    constructor(display, identifier) {
        this.display = display;
        this.identifier = identifier;
    }

    static fromDbRulePhase(phase) {
        return new VTRulePhase(phase.display, phase.identifier);
    }
}