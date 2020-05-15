"use strict";
const Express = require("express");
const Router = Express.Router();

var deck = require("../controllers/deckController");


Router.get("/decks", deck.getDecks);
Router.post("/deck", deck.createDeck);
Router.get("/deck/:deckId", deck.getDeck);
// Router.put("/deck/:deckId", deck.updatedeck);
Router.delete("/deck/:deckId", deck.deleteDeck);

module.exports = Router;

