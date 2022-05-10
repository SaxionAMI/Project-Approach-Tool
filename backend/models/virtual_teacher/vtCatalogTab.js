"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VtCatalogTabSchema = new Schema({  
  display: {
    type: String
  },
  type: {
    type: String,
  }
});

module.exports = mongoose.model("VtCatalogTab", VtCatalogTabSchema);