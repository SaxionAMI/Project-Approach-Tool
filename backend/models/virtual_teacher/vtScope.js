"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VtScopeSchema = new Schema({  
  display: {
    type: String
  },
  type: {
    type: String,
  }
});

module.exports = mongoose.model("VtScope", VtScopeSchema);