"use strict";
const Express = require("express");
const Router = Express.Router();
const template = require("../controllers/templateController");

//  The get routings
Router.get("/template", template.getTemplates);
Router.get("/template/example", template.getExampleTemplate);

//  The post and upsert routings
// where tf is upsert in the controller??
Router.post("/template", template.addTemplate);

module.exports = Router;
