"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CardSchema = new Schema({
  Title: {
    type: String,
    required: [(true, "Title is required")]
  },
  ShortDescription: {
    type: String,
    required: [(true, "Short Description is required")]
  },
  LongDescription: {
    type: String
  },
  Type: {
      type: String,
    required: [true, "Deck type is required"]
  },
  Note: {
      type: String,
  },
  Picture: {
      type: String
  },
  ReflectiveQuestions: {
     type: String
  },
  Color: {
     type: String
  },
  Deck: {
    type: String
  }

});

module.exports = mongoose.model("Card", CardSchema);
