"use strict";
const Express = require("express");
const Router = Express.Router();
const card = require("../controllers/cardController");

//  The post and upsert routings

/**
 * @api {get} /card/steppingstone Get all steppingstone cards.
 * @apiName getSteppingStoneCards
 * @apiGroup card
 *
 * @apiSuccess {Object} card                     Card object.
 * @apiSuccess {String} card.id                  Card's id.
 * @apiSuccess {String} card.title               Card's title.
 * @apiSuccess {String} card.shortDescription    Card's short description.
 * @apiSuccess {String} card.longDescription     Cards's long description.
 * @apiSuccess {String} card.type                Card's type.
 * @apiSuccess {String} card.note                Card's note.
 * @apiSuccess {String} card.picture             The path of the card's picture.
 * @apiSuccess {String} card.color               Card's color.
 * @apiSuccess {String} card.reflectiveQuestions Card's reflectiveQuestions.
 * @apiSuccess {String} card.deck                Card's deck.
 * @apiSuccess {Date} card.startDate             Card's start date.
 * @apiSuccess {Date} card.endDate               Card's end date.
 * @apiSuccess {String} card._id                 Card's Object ID in mongodb.
 */
Router.get("/card/steppingstone", card.getSteppingStoneCards);



// this call is not restful
/**
 * @api {get} /card/methods Get all method cards.
 * @apiName getMethodCards
 * @apiGroup card
 *
 * @apiSuccess {Object} card                     Card object.
 * @apiSuccess {String} card.id                  Card's id.
 * @apiSuccess {String} card.title               Card's title.
 * @apiSuccess {String} card.shortDescription    Card's short description.
 * @apiSuccess {String} card.longDescription     Cards's long description.
 * @apiSuccess {String} card.type                Card's type.
 * @apiSuccess {String} card.note                Card's note.
 * @apiSuccess {String} card.picture             The path of the card's picture.
 * @apiSuccess {String} card.color               Card's color.
 * @apiSuccess {String} card.reflectiveQuestions Card's reflectiveQuestions.
 * @apiSuccess {String} card.deck                Card's deck.
 * @apiSuccess {Date} card.startDate             Card's start date.
 * @apiSuccess {Date} card.endDate               Card's end date.
 * @apiSuccess {String} card._id                 Card's Object ID in mongodb.
 */
Router.get("/card/methods", card.getMethodCards);


/**
 * @api {get} /card/:cardId Get card by ID.
 *
 * @apiParam {String} id Card's unique ID.
 *
 * @apiName getCardByID
 * @apiGroup card
 *
 * @apiSuccess {Object} card                     Card object.
 * @apiSuccess {String} card.id                  Card's id.
 * @apiSuccess {String} card.title               Card's title.
 * @apiSuccess {String} card.shortDescription    Card's short description.
 * @apiSuccess {String} card.longDescription     Cards's long description.
 * @apiSuccess {String} card.type                Card's type.
 * @apiSuccess {String} card.note                Card's note.
 * @apiSuccess {String} card.picture             The path of the card's picture.
 * @apiSuccess {String} card.color               Card's color.
 * @apiSuccess {String} card.reflectiveQuestions Card's reflectiveQuestions.
 * @apiSuccess {String} card.deck                Card's deck.
 * @apiSuccess {Date} card.startDate             Card's start date.
 * @apiSuccess {Date} card.endDate               Card's end date.
 * @apiSuccess {String} card._id                 Card's Object ID in mongodb.
 */
Router.get("/card/:cardId", card.getCard);

// this call is not restful
/**
 * @api {get} /card/deck/:deck Get cards by deck id
 *
 * @apiParam {String} deck Deck's unique ID.
 *
 * @apiName getCardsByDeckID
 * @apiGroup card
 *
 * @apiSuccess {Object} card                     Card object.
 * @apiSuccess {String} card.id                  Card's id.
 * @apiSuccess {String} card.title               Card's title.
 * @apiSuccess {String} card.shortDescription    Card's short description.
 * @apiSuccess {String} card.longDescription     Cards's long description.
 * @apiSuccess {String} card.type                Card's type.
 * @apiSuccess {String} card.note                Card's note.
 * @apiSuccess {String} card.picture             The path of the card's picture.
 * @apiSuccess {String} card.color               Card's color.
 * @apiSuccess {String} card.reflectiveQuestions Card's reflectiveQuestions.
 * @apiSuccess {String} card.deck                Card's deck.
 * @apiSuccess {Date} card.startDate             Card's start date.
 * @apiSuccess {Date} card.endDate               Card's end date.
 * @apiSuccess {String} card._id                 Card's Object ID in mongodb.
 */
Router.get("/card/deck/:deck", card.getCardsByDeck);



//  The post and upsert routings

/**
 * @api {post} /card Create new card.
 * @apiBody {Object} card                        Card object.
 * @apiBody {Object} card                     Card object.
 * @apiBody {String} card.id                  Card's id.
 * @apiBody {String} card.title               Card's title.
 * @apiBody {String} card.shortDescription    Card's short description.
 * @apiBody {String} card.longDescription     Cards's long description.
 * @apiBody {String} card.type                Card's type.
 * @apiBody {String} card.note                Card's note.
 * @apiBody {String} card.picture             The path of the card's picture.
 * @apiBody {String} card.color               Card's color.
 * @apiBody {String} card.reflectiveQuestions Card's reflectiveQuestions.
 * @apiBody {String} card.deck                Card's deck.
 * @apiBody {Date} card.startDate             Card's start date.
 * @apiBody {Date} card.endDate               Card's end date.
 * @apiBody {String} card.id                  Card's id.
 *
 * @apiName postCard
 * @apiGroup card
 *
 * @apiSuccess {Object} card                     Card object.
 * @apiSuccess {String} card.id                  Card's id.
 * @apiSuccess {String} card.title               Card's title.
 * @apiSuccess {String} card.shortDescription    Card's short description.
 * @apiSuccess {String} card.longDescription     Cards's long description.
 * @apiSuccess {String} card.type                Card's type.
 * @apiSuccess {String} card.note                Card's note.
 * @apiSuccess {String} card.picture             The path of the card's picture.
 * @apiSuccess {String} card.color               Card's color.
 * @apiSuccess {String} card.reflectiveQuestions Card's reflectiveQuestions.
 * @apiSuccess {String} card.deck                Card's deck.
 * @apiSuccess {Date} card.startDate             Card's start date.
 * @apiSuccess {Date} card.endDate               Card's end date.
 * @apiSuccess {String} card._id                 Card's Object ID in mongodb.
 */
Router.post("/card", card.createCard);






/**
 * @api {put} /card/:cardId update a card.
 * @apiParam {String} cardId Card's unique ID.
 *
 * @apiBody {Object} card                        Card object.
 * @apiBody {Object} card                     Card object.
 * @apiBody {String} card.id                  Card's id.
 * @apiBody {String} card.title               Card's title.
 * @apiBody {String} card.shortDescription    Card's short description.
 * @apiBody {String} card.longDescription     Cards's long description.
 * @apiBody {String} card.type                Card's type.
 * @apiBody {String} card.note                Card's note.
 * @apiBody {String} card.picture             The path of the card's picture.
 * @apiBody {String} card.color               Card's color.
 * @apiBody {String} card.reflectiveQuestions Card's reflectiveQuestions.
 * @apiBody {String} card.deck                Card's deck.
 * @apiBody {Date} card.startDate             Card's start date.
 * @apiBody {Date} card.endDate               Card's end date.
 * @apiBody {String} card.id                  Card's id.
 *
 * @apiName putCard
 * @apiGroup card
 *
 * @apiSuccess {Object} card                     Card object.
 * @apiSuccess {String} card.id                  Card's id.
 * @apiSuccess {String} card.title               Card's title.
 * @apiSuccess {String} card.shortDescription    Card's short description.
 * @apiSuccess {String} card.longDescription     Cards's long description.
 * @apiSuccess {String} card.type                Card's type.
 * @apiSuccess {String} card.note                Card's note.
 * @apiSuccess {String} card.picture             The path of the card's picture.
 * @apiSuccess {String} card.color               Card's color.
 * @apiSuccess {String} card.reflectiveQuestions Card's reflectiveQuestions.
 * @apiSuccess {String} card.deck                Card's deck.
 * @apiSuccess {Date} card.startDate             Card's start date.
 * @apiSuccess {Date} card.endDate               Card's end date.
 * @apiSuccess {String} card._id                 Card's Object ID in mongodb.
 */
Router.put("/card/:cardId", card.updateCard);

// The delete routings
/**
 * @api {delete} /card/:cardId update a card.
 * @apiParam {String} cardId Card's unique ID.
 *
 * @apiName deleteCard
 * @apiGroup card
 *
 * @apiSuccess {Object} card                     Card object.
 * @apiSuccess {String} card.id                  Card's id.
 * @apiSuccess {String} card.title               Card's title.
 * @apiSuccess {String} card.shortDescription    Card's short description.
 * @apiSuccess {String} card.longDescription     Cards's long description.
 * @apiSuccess {String} card.type                Card's type.
 * @apiSuccess {String} card.note                Card's note.
 * @apiSuccess {String} card.picture             The path of the card's picture.
 * @apiSuccess {String} card.color               Card's color.
 * @apiSuccess {String} card.reflectiveQuestions Card's reflectiveQuestions.
 * @apiSuccess {String} card.deck                Card's deck.
 * @apiSuccess {Date} card.startDate             Card's start date.
 * @apiSuccess {Date} card.endDate               Card's end date.
 * @apiSuccess {String} card._id                 Card's Object ID in mongodb.
 */
Router.delete("/card/:cardId", card.deleteCard);

module.exports = Router;
