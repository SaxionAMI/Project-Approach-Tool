"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  title: {
    type: String,
    required: [(true, "Title is required")],
  },
  shortDescription: {
    type: String,
    required: [(true, "Short Description is required")],
  },
  types: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("Deck", DeckSchema);
