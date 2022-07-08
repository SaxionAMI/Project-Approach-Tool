"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VtConditionSchema = new Schema({  
  display: {
    type: String
  },
  type: {
    type: String,
  },
  archetype: {
    type: String,
  },
  supportsMultiCondition: {
    type: Boolean,
  },
  canBeRootCondition: {
    type: Boolean,
  },
  description: {
    type: String
  },
  selectable: {
    type: Boolean
  }
});

module.exports = mongoose.model("VtCondition", VtConditionSchema);