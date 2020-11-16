"use strict";
const Express = require("express");
const Router = Express.Router();
const card = require("../controllers/cardController");

//  The post and upsert routings
Router.get("/card/steppingstone", card.getSteppingStoneCards);
Router.get("/card/methods", card.getMethodCards);
Router.get("/card/:cardId", card.getCard);
Router.get("/card/deck/:deck", card.getCardsByDeck);

//  The post and upsert routings
Router.post("/card", card.createCard);

// The delete routings
Router.delete("/card/:cardId", card.deleteCard);

module.exports = Router;
