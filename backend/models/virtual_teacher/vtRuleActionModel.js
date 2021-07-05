"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VtRuleActionSchema = new Schema({  
  display: {
    type: String
  },
  type: {
    type: String,
  },
  attributes: {
    type: ["mixed"]
  },
  secondaryAction: {
      type: "mixed"
  }
});

module.exports = mongoose.model("VtRuleAction", VtRuleActionSchema);
