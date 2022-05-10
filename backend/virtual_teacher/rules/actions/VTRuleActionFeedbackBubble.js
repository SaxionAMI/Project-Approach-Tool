const VTRulePrimaryAction = require("./VTRulePrimaryAction");

module.exports = class VTRuleActionFeedbackBubble extends VTRulePrimaryAction{
    constructor(title, subtitle, message, severity, secondaryAction) {
        super('feedbackBubble', secondaryAction, severity);
        this.message = message;
        this.title = title;
        this.subtitle = subtitle;
    }

    static fromDbAction(action) {
        const title = action.attributes.find(x => x.key == 'title');
        const subtitle = action.attributes.find(x => x.key == 'subtitle');
        const message = action.attributes.find(x => x.key == 'description');
        const severity = action.attributes.find(x => x.key == 'severity');

        if (title == null || subtitle == null || message == null || severity == null) return null;
        return new VTRuleActionFeedbackBubble(title.value, subtitle.value, message.value, severity.value, null)
    }
}