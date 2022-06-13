"use strict";
const Express = require("express");
const Router = Express.Router();
const deck = require("../controllers/deckController");

//  The get routings
/**
 * @api {get} /deck/:deckId Get deck by ID.
 *
 * @apiParam {String} id Deck's unique ID.
 *
 * @apiName getDeckByID
 * @apiGroup deck
 *
 * @apiSuccess {Object} deck                     Deck object.
 * @apiSuccess {String} deck.title               Deck's title.
 * @apiSuccess {String} deck.shortDescription    Deck's short description.
 * @apiSuccess {String} deck.type                Deck's type.
 * @apiSuccess {String} deck._id                 Deck's Object ID in mongodb.
 */
Router.get("/deck/:deckId", deck.getDeck);

/**
 * @api {get} /deck Get all decks.
 *
 * @apiName getAllDecks
 * @apiGroup deck
 *
 * @apiSuccess {Object} deck                     Deck object.
 * @apiSuccess {String} deck.title               Deck's title.
 * @apiSuccess {String} deck.shortDescription    Deck's short description.
 * @apiSuccess {String} deck.type                Deck's type.
 * @apiSuccess {String} deck._id                 Deck's Object ID in mongodb.
 */
Router.get("/deck", deck.getDecks);

//  The post and upsert routings
/**
 * @api {post} /deck Create a deck.
 *
 * @apiName createDeck
 * @apiGroup deck
 *
 * @apiBody {Object} deck                     Deck object.
 * @apiBody {String} deck.title               Deck's title.
 * @apiBody {String} deck.shortDescription    Deck's short description.
 * @apiBody {String[]} deck.types               Deck's types.
 *
 * @apiSuccess {Object} deck                     Deck object.
 * @apiSuccess {String} deck.title               Deck's title.
 * @apiSuccess {String} deck.shortDescription    Deck's short description.
 * @apiSuccess {String} deck.type                Deck's type.
 * @apiSuccess {String} deck._id                 Deck's Object ID in mongodb.
 */
Router.post("/deck", deck.createDeck);

//  The delete routings
/**
 * @api {delete} /deck/:deckId Delete deck by ID.
 *
 * @apiParam {String} id Deck's unique ID.
 *
 * @apiName deleteDeckByID
 * @apiGroup deck
 *
 * @apiSuccess {Object} deck                     Deck object.
 * @apiSuccess {String} deck.title               Deck's title.
 * @apiSuccess {String} deck.shortDescription    Deck's short description.
 * @apiSuccess {String} deck.type                Deck's type.
 * @apiSuccess {String} deck._id                 Deck's Object ID in mongodb.
 */
Router.delete("/deck/:deckId", deck.deleteDeck);

module.exports = Router;

