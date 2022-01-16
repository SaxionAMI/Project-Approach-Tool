"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
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
  deck: {
    type: String
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  }
});

module.exports = mongoose.model("Card", CardSchema);
