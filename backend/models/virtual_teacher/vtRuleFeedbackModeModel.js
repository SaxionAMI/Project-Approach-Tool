"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VtRuleFeedbackModeSchema = new Schema({  
  display: {
    type: String,
  },
  identifier: {
    type: String
  }
});

module.exports = mongoose.model("VtRuleFeedbackMode", VtRuleFeedbackModeSchema);
