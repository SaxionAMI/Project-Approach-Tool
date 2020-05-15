"use strict";
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TemplateSchema = new Schema({
    "id": {
        "type": "Number"
    },
    "groups": {
        "type": [
            "Mixed"
        ]
    },
    "storedLines": {
        "type": [
            "Mixed"
        ]
    },
    "title": {
        "type": "String"
    },
    "goal": {
        "type": "String"
    },
    "image": {
        "type": "String"
    }
});

module.exports = mongoose.model("Template", TemplateSchema);
