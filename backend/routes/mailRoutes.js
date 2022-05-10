"use strict";
const Express = require("express");
const Router = Express.Router();
const mail = require("../controllers/mailController");

//  The post and upsert routings
Router.post("/invite", mail.inviteUsers);

module.exports = Router;
