module.exports = class ValidationResult {
    constructor(validationResultItems) {
        this.errors = validationResultItems.filter(x => x);
    }

    get isValid() {
        return !this.errors || this.errors.length == 0;
    }
}