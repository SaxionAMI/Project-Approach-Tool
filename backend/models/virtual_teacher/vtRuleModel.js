"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VtRuleSchema = new Schema({  
  title: {
    type: String,
  },
  description: {
    type: String
  },
  phases: {
      type: ["mixed"]
  },
  condition: {
      type: "mixed"
  },
  action: {
      type: "mixed"
  },
  configurable: {
    type: Boolean,
    default: true
  },
  enabled: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("VtRule", VtRuleSchema);
