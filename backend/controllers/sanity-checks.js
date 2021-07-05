const ValidationResult = require("../validators/base/validation-result");

/**
 * Reject the request if a given value is null. If rejected, yields a configurable HTTP status code.
 * @param {import("express").Response} res The response to reject.
 * @param {*} value The value to validate.
 * @param {number} status The status code to return. Recommended status codes are in 400 range ("client error" section)
 * @param {string} message A descriptive error message to send to the client.
 */
exports.rejectIfNull = function(res, value, status, message) {
    if (value === undefined) {
        res.status(status).send({
            message: message
        });
    }
}

/**
 * Reject if the given promise yields a truthy value. If rejected, yields a HTTP status code 409 (conflict).
 * @example rejectIfExists(res, VtRule.exists({_id, 42}), 'uh oh!', callbackIfNotExists);
 * @param {import("express").Response} res The response to reject.
 * @param {Promise<any>} promise The promise to evaluate.
 * @param {string} message The error message to send to the client if the response is rejected.
 * @param {Function} orElse A callback to invoke if the response is not rejected.
 */
exports.rejectIfExists = function(res, promise, message, orElse) {
    promise.then(exists => {
        if (exists) {
            res.status(409).send({
                message: message
            })
        }
        else {
            orElse()
        }
    })
}

/**
 * Reject if the given promise yields a falsy value. If rejected, yields a HTTP status code 404 (not found).
 * @example rejectIfNotExists(res, SomeMongooseDocument.exists({_id, 42}), 'uh oh!', callbackIfNotExists);
 * @param {import("express").Response} res The response to reject.
 * @param {Promise<any>} promise The promise to evaluate.
 * @param {string} message The error message to send to the client if the response is rejected.
 * @param {Function} orElse A callback to invoke if the response is not rejected.
 */
exports.rejectIfNotExists = function(res, promise, message, orElse) {
    promise.then(exists => {
        if (!exists) {
            res.status(404).send({
                message: message
            })
        }
        else {
            orElse()
        }
    })
}

/**
 * Reject if the given validation result has errors.
 * @param {import("express").Response} res The response to reject.
 * @param {ValidationResult} validationResult The validation result to evaluate.
 * @param {Function} orElse A callback to invoke if the response is not rejected.
 */
exports.rejectIfValidationErrors = function(res, validationResult, orElse) {
    if (!validationResult.isValid) {
        console.log(validationResult);
        res.status(400).json(validationResult);
    }
    orElse();
}