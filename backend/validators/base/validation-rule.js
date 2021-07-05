module.exports = class ValidationRule {
    constructor(selector) {
        this.selector = selector;
        this.fieldName = 'Unspecified';
        this.messageBuilder = _ => 'Value is invalid';
        this.statusCodeBuilder = _ => 400;
    }

    static for(selector) {
        return new ValidationRule(selector);
    }

    must(condition) {
        this.condition = condition;
        return this;
    }

    withName(name) {
        this.fieldName = fieldName;
        return this;
    }

    withError(messageBuilder) {
        this.messageBuilder = messageBuilder;
        return this;
    }

    validate(data) {
        const value = this.selector(data);
        const result = this.condition(value);
        if (!result) {
            return {
                field: this.fieldName,
                value: value,
                message: this.messageBuilder(value)
            }
        }
        else return undefined;
    }
}