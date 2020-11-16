"use strict";
const Express = require("express");
const Router = Express.Router();
const User = require("../controllers/userController");

//  The post and upsert routings
Router.post("/user", User.postUser);
Router.post("/user/check", User.checkIfValidEmail);

//  The get routings
Router.get("/user/:uid", User.getUserByUid);
Router.get("/user/export/:uid", User.getExportReadyUserData);

//  The update routings
Router.put("/user/:uid", User.updateUser);

//  The delete routings
Router.delete("/user/:uid", User.deleteUser);

module.exports = Router;
