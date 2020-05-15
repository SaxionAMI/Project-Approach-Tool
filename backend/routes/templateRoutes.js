"use strict";
const Express = require("express");
const Router = Express.Router();

const multer = require("multer");
const upload = multer({dest: 'uploads/'})

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});



var template = require("../controllers/templateController");

Router.get("/template", template.getTemplates);
Router.post("/template", template.addTemplate);

module.exports = Router;
