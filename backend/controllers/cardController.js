const mongoose = require("mongoose");
const Card = mongoose.model("Card");

// only get the Method cards
exports.getMethodCards = function (req, res) {
  Card.find({ deck: "ICT" }).then((cards) => {
    res.status(200).json(cards);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding the stepping stones.",
    });
  });
};

// only get the Stepping stone cards
exports.getSteppingStoneCards = function (req, res) {
  Card.find({ deck: "Stepping stone" }).then((cards) => {
    res.status(200).json(cards);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding the stepping stones.",
    });
  });
};

// create a new card
exports.createCard = function (req, res) {
  const newCard = new Card(req.body);
  newCard
    .save()
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the card.",
      });
    });
};

// update existing card
exports.updateCard = function (req, res) {
  // const filter = { id: Number(req.params.cardId) };

  Card.find().then((card) => {
     res.status(200).json(card);
  }).catch((err) => {
    res.status(404).send({
      message: err.message || "Card not found",
    });
  });

  // Card.findOneAndUpdate(filter, req.body, { new: true })
  //   .then((card) => {
  //     console.log("-----", card);
  //     res.status(200).json(card);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while creating the card.",
  //     });
  //   });
};

// get a card by id
exports.getCard = function (req, res) {
  Card.findById(req.params.cardId)
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding the card.",
      });
    });
};

// delete a card by _id
exports.deleteCard = function (req, res) {
  Card.remove({
    _id: req.params.cardId,
  })
    .then((card) => {
      if (err) res.send(err);
      res.status(200).json({ message: "card deleted" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the card.",
      });
    });
};

// get all cards from a certain deck
exports.getCardsByDeck = function (req, res) {
  Card.find({ deck: req.params.deck })
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the cards by deck.",
      });
    });
};
