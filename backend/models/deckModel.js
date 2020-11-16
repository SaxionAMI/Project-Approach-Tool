"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DeckSchema = new Schema({
  title: {
    type: String,
    required: [(true, "Title is required")],
  },
  shortDescription: {
    type: String,
    required: [(true, "Short Description is required")],
  },
  types:{
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("Deck", DeckSchema);
