"use strict";
const Express = require("express");
const Router = Express.Router();
const deck = require("../controllers/deckController");

//  The get routings
Router.get("/deck/:deckId", deck.getDeck);
Router.get("/deck", deck.getDecks);

//  The post and upsert routings
Router.post("/deck", deck.createDeck);

//  The delete routings
Router.delete("/deck/:deckId", deck.deleteDeck);

module.exports = Router;

