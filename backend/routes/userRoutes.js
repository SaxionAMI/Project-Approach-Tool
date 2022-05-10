"use strict";
const Express = require("express");
const Router = Express.Router();
const User = require("../controllers/userController");
const authorization = require("../authorizationModule");

//  The post and upsert routings
Router.post("/user", User.postUser);
Router.post("/user/check", User.checkIfValidEmail);
Router.post("/user/:uid/role", authorization.hasRole(['admin']), User.setUserRole);

//  The get routings
Router.get("/user/role", authorization.hasRole(['admin']), User.getUserRoles);
Router.get("/user/:uid", User.getUserByUid);
Router.get("/user/export/:uid", User.getExportReadyUserData);

//  The update routings
Router.put("/user/:uid", User.updateUser);

//  The delete routings
Router.delete("/user/:uid", User.deleteUser);

module.exports = Router;
