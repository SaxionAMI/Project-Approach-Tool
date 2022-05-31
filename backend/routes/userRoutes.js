"use strict";
const Express = require("express");
const Router = Express.Router();
const User = require("../controllers/userController");
const authorization = require("../authorizationModule");

/**
 * @api {post} /user Request
 * @apiName post
 * @apiGroup user
 *
 * @apiSuccess {}
 */
Router.post("/user", User.postUser);

/**
 * @api {post} /user/check Request
 * @apiName post
 * @apiGroup user
 *
 * @apiSuccess {}
 */
Router.post("/user/check", User.checkIfValidEmail);

/**
 * @api {post} /user/:uid/role Request
 * @apiName post
 * @apiGroup user
 *
 * @apiSuccess {}
 */
Router.post("/user/:uid/role", authorization.hasRole(['admin']), User.setUserRole);

/**
 * @api {get} /user/role Request
 * @apiName get
 * @apiGroup user
 *
 * @apiSuccess {}
 */
Router.get("/user/role", authorization.hasRole(['admin']), User.getUserRoles);

/**
 * @api {get} /user/:uid Request
 * @apiName get
 * @apiGroup user
 *
 * @apiSuccess {}
 */
Router.get("/user/:uid", User.getUserByUid);

/**
 * @api {get} /user/export/:uid Request
 * @apiName get
 * @apiGroup user
 *
 * @apiSuccess {}
 */
Router.get("/user/export/:uid", User.getExportReadyUserData);


/**
 * @api {put} /user/:uid Request
 * @apiName put
 * @apiGroup user
 *
 * @apiSuccess {}
 */
Router.put("/user/:uid", User.updateUser);


/**
 * @api {delete} /user/:uid Request
 * @apiName delete
 * @apiGroup user
 *
 * @apiSuccess {}
 */
Router.delete("/user/:uid", User.deleteUser);

module.exports = Router;
