"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VtComparisonSchema = new Schema({
  display: {
    type: String
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model("VtComparison", VtComparisonSchema);