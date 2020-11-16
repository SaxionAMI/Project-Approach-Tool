"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CardSchema = new Schema({
  id: {
    type: String
  },
  title: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  longDescription: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "Card type is required"],
  },
  note: {
    type: String,
  },
  picture: {
    type: String,
  },
  color: {
    type: String,
  },
  reflectiveQuestions: {
    type: String,
  },
  deck:{
    type: String
  }
});

module.exports = mongoose.model("Card", CardSchema);
