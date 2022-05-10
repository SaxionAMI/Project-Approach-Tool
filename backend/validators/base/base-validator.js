const ValidationResult = require("./validation-result");
const ValidationRule = require("./validation-rule")

module.exports = class BaseValidator {
    /**
     * Create a new validation rule.
     * @param {Function} selector 
     * @returns {ValidationRule} a validation rule to be configured further.
     */
    ruleFor(selector) {
        if (!this.validationRules) {
            this.validationRules = [];
        }

        const rule = ValidationRule.for(selector);
        this.validationRules.push(rule);
        return rule;
    }

    /**
     * Validates the given data against the validation rules dictated by this validator.
     * @param {*} item The data to validate.
     * @returns {ValidationResult} A validation result that tells if the data is valid and which fields are invalid (if any).
     */
    validate(item) {
        if (!this.validationRules || this.validationRules.length == 0) {
            throw Error(typeof(this) + ": validator does not have any validation rules.");
        }

        const resultItems = [];
        for(const rule_index in this.validationRules) {
            const rule = this.validationRules[rule_index];
            const result = rule.validate(item);
            if (result) {
                resultItems.push(result);
            }
        }
        return new ValidationResult(resultItems);
    }
}