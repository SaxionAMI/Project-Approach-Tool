module.exports = class VTRuleScope {
    evaluate(data) {
        throw Error('VTRuleScope.evaluate must be overridden in all derived types.');
    }
}