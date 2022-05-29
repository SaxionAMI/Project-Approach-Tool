"use strict";
const Express = require("express");
const Router = Express.Router();
const card = require("../controllers/cardController");

//  The post and upsert routings ??? wtf? these aren't get requests
// this call is not restful
Router.get("/card/steppingstone", card.getSteppingStoneCards);
// this call is not restful
Router.get("/card/methods", card.getMethodCards);

Router.get("/card/:cardId", card.getCard);

// this call is not restful
Router.get("/card/deck/:deck", card.getCardsByDeck);

//  The post and upsert routings
Router.post("/card", card.createCard);
Router.put("/card/:cardId", card.updateCard);

// The delete routings
Router.delete("/card/:cardId", card.deleteCard);

module.exports = Router;
