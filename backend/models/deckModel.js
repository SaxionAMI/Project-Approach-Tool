"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DeckSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    Title: {
        type: String,
        required: [(true, "Title is required")]
    },
    ShortDescription: {
        type: String,
        required: [(true, "Short Description is required")]
    }
});

module.exports = mongoose.model("Deck", DeckSchema);