var mongoose = require("mongoose"),
    Card = mongoose.model("Card");

exports.getCards = function(req, res) {
    Card.find({}, function(err, result) {
    if (err) res.send(err);
    res.json(result);
  });
};

exports.getSteppingStoneCards = function(req, res) {
  Card.find({Deck: "Stepping stone"}, function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
}

// TODO Check if the Deck is available
exports.createCard = function(req, res) {
  var newCard = new Card(req.body);
  newCard.save(function(err, result) {
    if (err) res.send(err);
    res.json(result);
  });
};

exports.getCard = function (req, res) {
    Card.findById(req.params.cardId, function(err, task) {
      if (err) res.send(err);
      res.json(task);
    });
};

exports.deleteCard = function (req, res) {
    Card.remove(
      {
        _id: req.params.cardId
      },
      function(err, task) {
        if (err) res.send(err);
        res.json({ message: "card deleted" });
      }
    );
};

// TODO get cards by deck