const VTOpenCatalogAction = require("./secondary/VTOpenCatalogAction");
const VTOpenSearchAction = require("./secondary/VTOpenSearchAction");
const VTOpenWebsiteAction = require("./secondary/VTOpenWebsiteAction");
const VTRuleActionFeedbackBubble = require("./VTRuleActionFeedbackBubble");
const VTRuleActionShowMetrics = require("./VTRuleActionShowMetrics");

const convertAction = function(action) {
    if (action == null) return null;
    switch(action.type) {
        case "VTRuleActionShowFeedbackBubble": return VTRuleActionFeedbackBubble.fromDbAction(action);
        case "VTRuleActionShowMetrics": return VTRuleActionShowMetrics.fromDbAction(action);
        case "VTOpenCatalogAction": return VTOpenCatalogAction.fromDbAction(action);
        case "VTOpenSearchAction": return VTOpenSearchAction.fromDbAction(action);
        case "VTOpenWebsiteAction": return VTOpenWebsiteAction.fromDbAction(action);
        default: return null;
    }
}

module.exports = class VTRuleActionFactory {
    static fromDbRuleAction(action) {
        if (action == null) return null;
        let result = convertAction(action);
        result.secondaryAction = convertAction(action.secondaryAction);
        return result;
    }
}