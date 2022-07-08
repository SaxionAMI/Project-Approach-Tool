const mongoose = require("mongoose");
const Template = mongoose.model("Template");

//  get all templates
exports.getTemplates = function (req, res) {
  Template.find({}, { _id: 0 })
    .then((template) => {
      res.status(200).json(template);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the templates.",
      });
    });
};

//  get the example template that is used during the onboarding proces
exports.getExampleTemplate = function (req, res) {
  Template.findOne({ _id: "5f60acfcf07924e04a696f2f" }, { _id: 0 })
    .then((template) => {
      res.status(200).json(template);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while finding the example template.",
      });
    });
};

//   add a template to the database
exports.addTemplate = function (req, res) {
  const newTemplate = new Template(req.body);
  newTemplate
    .save()
    .then((template) => {
      res.status(200).json(template);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the template.",
      });
    });
};
