"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
  groups: {
    type: ["Mixed"],
  },
  storedLines: {
    type: ["Mixed"],
  },
  users: {
    type: ["Mixed"],
  },
  title: {
    type: "String",
  },
  goal: {
    type: "String",
  },
  image: {
    type: "String",
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
  disabledRuleIds: {
    type: ["String"]
  },
  permanentDisableVT: {
    type: Boolean
  }
});

module.exports = mongoose.model("Workspace", workspaceSchema);
