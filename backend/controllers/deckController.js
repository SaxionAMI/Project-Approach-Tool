const mongoose = require("mongoose");
const Deck = mongoose.model("Deck");

// get all decks
exports.getDecks = function (req, res) {
  Deck.find({})
    .then((decks) => {
      res.status(200).json(decks);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding the decks.",
      });
    });
};

//  create a new deck
exports.createDeck = function (req, res) {
  const newDeck = new Deck(req.body);
  newDeck
    .save()
    .then((deck) => {
      res.status(200).json(deck);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the deck.",
      });
    });
};

//  get a deck by id
exports.getDeck = function (req, res) {
  Deck.findById(req.params.deckId)
    .then((deck) => {
      res.status(200).json(deck);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding the deck.",
      });
    });
};

//  delete a deck by _id
exports.deleteDeck = function (req, res) {
  Deck.remove({
    _id: req.params.deckId,
  })
    .then((deck) => {
      res.status(200).json({ message: "deck deleted" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the deck.",
      });
    });
};
