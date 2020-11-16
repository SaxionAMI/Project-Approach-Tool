"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  groups: {
    type: ["Mixed"]
  },
  storedLines: {
    type: ["Mixed"]
  },
  title: {
    type: "String"
  },
  goal: {
    type: "String"
  },
  image: {
    type: "String"
  },
  spawnList: {
    type: "Mixed"
  },
  customCards: {
    type: "Mixed"
  },
  decks: {
    type: "Mixed"
  },
  users: {
    type: "Mixed"
  }
});

module.exports = mongoose.model("Template", TemplateSchema);
