"use strict";
const Express = require("express");
const Router = Express.Router();
const User = require("../controllers/userController");
const authorization = require("../authorizationModule");

/**
 * @api {post} /user Create new user.
 * @apiBody {String} user.firstName  Users firstname.
 * @apiBody {String} user.lastName   Users lastname.
 * @apiBody {String} user.email      Users email address.
 * @apiBody {String} user.study      Users study.
 * @apiBody {String} user.school     Users school.
 * @apiBody {String} user.uid        Users ID.
 *
 * @apiName postUser
 * @apiGroup user
 * 
 * @apiSuccess {Object} user            User object.
 * @apiSuccess {String} user.role       Users role.
 * @apiSuccess {String} user._id        Users encrypted database Object ID.
 * @apiSuccess {String} user.firstName  Users encrypted firstname.
 * @apiSuccess {String} user.lastName   Users encrypted lastname.
 * @apiSuccess {String} user.email      Users encrypted email address.
 * @apiSuccess {String} user.study      Users study.
 * @apiSuccess {String} user.school     Users school.
 * @apiSuccess {String} user.uid        Users ID.
 */
Router.post("/user", User.postUser);

/**
 * @api {post} /user/check Check if email is valid.
 * @apiBody {String} email      Users email address.
 * 
 * @apiName checkIfValidEmail
 * @apiGroup user
 * 
 * There is no identifier for boolean below
 * @apiSuccess {Boolean} result True if use email is valid.
 */
Router.post("/user/check", User.checkIfValidEmail);

/**
 * @api {post} /user/:uid/role Set user role.
 * @apiParam {String} uid Users unique ID.
 *
 * @apiBody {String} role Users new role
 * 
 * @apiName setUserRole
 * @apiGroup user
 * 
 * @apiSuccess {Object} user            User object.
 * @apiSuccess {String} user.role       Users role.
 * @apiSuccess {String} user.firstName  Users encrypted firstname.
 * @apiSuccess {String} user.lastName   Users encrypted lastname.
 * @apiSuccess {String} user.study      Users study.
 * @apiSuccess {String} user.school     Users school.
 * @apiSuccess {String} user.uid        Users ID.
 */
Router.post("/user/:uid/role", authorization.hasRole(['admin']), User.setUserRole);

/**
 * @api {get} /user/role Get user roles.
 * 
 * @apiName getUserRoles
 * @apiGroup user
 *
 * @apiSuccess {Object[]} user          List of user objects.
 * @apiSuccess {String} user.role       Users role.
 * @apiSuccess {String} user.firstName  Users encrypted firstname.
 * @apiSuccess {String} user.lastName   Users encrypted lastname.
 * @apiSuccess {String} user.study      Users study.
 * @apiSuccess {String} user.school     Users school.
 * @apiSuccess {String} user.uid        Users ID.
 */
Router.get("/user/role", authorization.hasRole(['admin']), User.getUserRoles);

/**
 * @api {get} /user/:uid Get user by ID.
 * 
 * @apiParam {String} uid Users unique ID.
 * 
 * @apiName getUserByUid
 * @apiGroup user
 *
 * @apiSuccess {Object} user            User object.
 * @apiSuccess {String} user.role       Users role.
 * @apiSuccess {String} user._id        Users database Object ID.
 * @apiSuccess {String} user.firstName  Users firstname.
 * @apiSuccess {String} user.lastName   Users lastname.
 * @apiSuccess {String} user.email      Users email address.
 * @apiSuccess {String} user.study      Users study.
 * @apiSuccess {String} user.school     Users school.
 * @apiSuccess {String} user.uid        Users ID.
 */
Router.get("/user/:uid", User.getUserByUid);

/**
 * @api {get} /user/export/:uid Get export ready user data.
 * 
 * @apiParam {String} uid Users unique ID.
 * 
 * @apiName getExportReadyUserDate
 * @apiGroup user
 *
 * @apiSuccess {Object} user            User object.
 * @apiSuccess {String} user.role       Users role.
 * @apiSuccess {String} user.firstName  Users firstname.
 * @apiSuccess {String} user.lastName   Users lastname.
 * @apiSuccess {String} user.email      Users email address.
 * @apiSuccess {String} user.study      Users study.
 * @apiSuccess {String} user.school     Users school.
 */
Router.get("/user/export/:uid", User.getExportReadyUserData);


/**
 * @api {put} /user/:uid Update user.
 * 
 * @apiParam {String} uid Users unique ID.
 * 
 * @apiName updateUser
 * @apiGroup user
 *
 * @apiSuccess {Object} user            User object.
 * @apiSuccess {String} user.role       Users role.
 * @apiSuccess {String} user._id        Users database Object ID.
 * @apiSuccess {String} user.firstName  Users firstname.
 * @apiSuccess {String} user.lastName   Users lastname.
 * @apiSuccess {String} user.email      Users email address.
 * @apiSuccess {String} user.study      Users study.
 * @apiSuccess {String} user.school     Users school.
 * @apiSuccess {String} user.uid        Users ID.
 */
Router.put("/user/:uid", User.updateUser);


/**
 * @api {delete} /user/:uid Delete user.
 * 
 * @apiParam {String} uid Users unique ID.
 * 
 * @apiName deleteUser
 * @apiGroup user
 *
 * @apiSuccess {Object} user            User object.
 * @apiSuccess {String} user.role       Users role.
 * @apiSuccess {String} user._id        Users database Object ID.
 * @apiSuccess {String} user.firstName  Users encrypted firstname.
 * @apiSuccess {String} user.lastName   Users encrypted lastname.
 * @apiSuccess {String} user.email      Users encrypted email address.
 * @apiSuccess {String} user.study      Users study.
 * @apiSuccess {String} user.school     Users school.
 * @apiSuccess {String} user.uid        Users ID.
 */
Router.delete("/user/:uid", User.deleteUser);

module.exports = Router;
