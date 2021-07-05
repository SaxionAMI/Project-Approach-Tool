"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VtRuleConditionSchema = new Schema({  
  display: {
    type: String
  },
  type: {
    type: String,
  },
  attributes: {
    type: ["mixed"]
  }
});

module.exports = mongoose.model("VtRuleCondition", VtRuleConditionSchema);
