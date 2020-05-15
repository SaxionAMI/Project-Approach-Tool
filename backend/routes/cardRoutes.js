"use strict";
const Express = require("express");
const Router = Express.Router();

var card = require("../controllers/cardController");



Router.get("/card/steppingstone", card.getSteppingStoneCards);

Router.get("/card", card.getCards);
Router.post("/card", card.createCard);
Router.get("/card/:cardId", card.getCard);
// Router.put("/card/:cardId", card.updateCard);
Router.delete("/card/:cardId", card.deleteCard);

Router.get("/card/steppingstone", card.getSteppingStoneCards);

module.exports = Router;
