"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VtSeveritySchema = new Schema({  
  display: {
    type: String
  },
  type: {
    type: String,
  },
  selectable: {
    type: Boolean
  }
});

module.exports = mongoose.model("VtSeverity", VtSeveritySchema);