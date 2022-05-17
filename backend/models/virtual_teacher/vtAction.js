"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VtActionSchema = new Schema({  
  display: {
    type: String
  },
  type: {
    type: String,
  },
  primary: {
      type: Boolean
  },
  selectable: {
    type: Boolean
  }
});

module.exports = mongoose.model("VtAction", VtActionSchema);