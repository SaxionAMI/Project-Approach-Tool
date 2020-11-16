const mongoose = require("mongoose");
const Deck = mongoose.model("Deck");
const Card = mongoose.model("Card");
const Template = mongoose.model("Template");
const Express = require("express");
const Router = Express.Router();
const fs = require("fs");
mongoose.set("useFindAndModify", false);

// adds the stepping stone cards to the database
fs.readFile("./json/steppingStone.json", async(err, fileData) => {
  const steppingStones = JSON.parse(fileData);
  steppingStones.forEach((card) => {
    Card.findByIdAndUpdate(card._id, card, { upsert: true }, function (
      error,
      result
    ) {
      if (error) return;
    });
  });
});

// adds the ICT research method cards to the database
fs.readFile("./json/ict-methods.json", (err, fileData) => {
  const methods = JSON.parse(fileData);
  methods.forEach((card) => {
    Card.findByIdAndUpdate(card._id, card, { upsert: true }, function (
      error,
      result
    ) {
      if (error) return;
    });
  });
});

// adds the CMD research method cards to the database
fs.readFile("./json/cmd-methods.json", (err, fileData) => {
  const methods = JSON.parse(fileData);
  methods.forEach((card) => {
    Card.findByIdAndUpdate(card._id, card, { upsert: true }, function (
      error,
      result
    ) {
      if (error) return;
    });
  });
});

// adds the Engineering research method cards to the database
fs.readFile("./json/engineer-methods.json", (err, fileData) => {
  const methods = JSON.parse(fileData);
  methods.forEach((card) => {
    Card.findByIdAndUpdate(card._id, card, { upsert: true }, function (
      error,
      result
    ) {
      if (error) return;
    });
  });
});

// adds card decks to the database
fs.readFile("./json/decks.json", async(err, fileData) => {
  const methods = JSON.parse(fileData);
  methods.forEach(async(deck) => {
      Deck.findByIdAndUpdate(deck._id, deck, { upsert: true }, function (
        error,
        result
      ) {
        if (error) return;
      });
  });
});

//  adds templates to the database
fs.readFile("./json/templates.json", async(err, fileData) => {
  const templates = JSON.parse(fileData);
  templates.forEach(async(template) => {
      Template.findByIdAndUpdate(template._id, template, { upsert: true }, function (
        error,
        result
      ) {
        if (error) return;
      });
  });
});

module.exports = Router;
