const mongoose = require("mongoose");
const Workspace = mongoose.model("Workspace");
mongoose.set("useFindAndModify", false);

// upsert a workspace by id
exports.upsertWorkspaceById = function (req, res) {
  Workspace.findByIdAndUpdate(req.params._id, req.body, { upsert: true })
    .then((workspace) => {
      res.status(200).json(workspace);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while upserting a workspace.",
      });
    });
};

// update workspace fields
exports.updateWorkspaceFields = function (req, res) {
   Workspace.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then((card) => {
      res.status(200).json(card);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the card.",
      });
    });
};

//  get a workspace by id
exports.getWorkspaceById = function (req, res) {
  Workspace.findById(req.params._id)
    .then((workspace) => {
      res.status(200).json(workspace);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while finding the workspace by id.",
      });
    });
};

//  create a workspace
exports.postWorkspace = function (req, res) {
  const workspace = new Workspace(req.body);
  workspace
    .save()
    .then((workspace) => {
      res.status(200).json(workspace);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while posting the workspace.",
      });
    });
};

//  get a workspace by uid
exports.getWorkspacesByUID = function (req, res) {
  Workspace.find({ "users.uid": req.body.uid })
    .then((workspaces) => {
      if (workspaces.length > 0) {
        res.status(200).json(workspaces);
      } else {
        res.status(200).json([]);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the workspaces.",
      });
    });
};

//  delete workspace
exports.deleteWorkspace = function (req, res) {
  Workspace.findByIdAndDelete(req.params._id)
    .then((workspace) => {
      res.status(200).json(workspace);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the workspace.",
      });
    });
};

//  get custom cards
exports.getCustomCards = function (req, res) {
  Workspace.findById(req.params._id)
    .then((workspace) => {
      res.status(200).json(workspace.customCards);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding the custom cards.",
      });
    });
};
