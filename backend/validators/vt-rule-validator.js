const BaseValidator = require("./base/base-validator");

module.exports = class VtRuleValidator extends BaseValidator{   
    constructor() {
        super();
        this.ruleFor(x => x.phases).must(x => x != undefined).withError('Please specify at least one feedback mode.');
        this.ruleFor(x => x.phases).must(x => x.length > 0).withError('Please specify at least one feedback mode.');
        this.ruleFor(x => x.condition).must(x => x != undefined).withError('Please specify a rule condition.');
        this.ruleFor(x => x.action).must(x => x != undefined).withError('Please specify a rule condition.');
    }
}