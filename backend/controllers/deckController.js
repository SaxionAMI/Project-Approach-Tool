var mongoose = require("mongoose"),
    Deck = mongoose.model("Deck");

exports.getDecks = function (req, res) {
    Deck.find({}, function(err, task) {
      if (err) res.send(err);
      res.json(task);
    });
};

// TODO Check if the Deck is available
exports.createDeck = function (req, res) {
    var newDeck = new Deck(req.body);
    newDeck.save(function(err, task) {
      if (err) res.send(err);
      res.json(task);
    });
};

exports.getDeck = function (req, res) {
    Deck.findById(req.params.deckId, function(err, task) {
      if (err) res.send(err);
      res.json(task);
    });
};

exports.deleteDeck = function (req, res) {
    Deck.remove(
      {
        _id: req.params.deckId
      },
      function(err, task) {
        if (err) res.send(err);
        res.json({ message: "deck deleted" });
      }
    );
};
