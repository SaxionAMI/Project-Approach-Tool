"use strict";
const Express = require("express");
const Router = Express.Router();
const template = require("../controllers/templateController");

//  The get routings
/**
 * @api {get} /template Get all templates.
 *
 * @apiName getAllTemplates
 * @apiGroup template
 *
 * @apiSuccess {Object}     template                     Template object.
 * @apiSuccess {*[]}        template.group               Template's group.
 * @apiSuccess {*[]}        template.storedLines         Template's stored lines.
 * @apiSuccess {String}     template.title               Template's title.
 * @apiSuccess {String}     template.goal                Template's goal.
 * @apiSuccess {String}     template.image               Template's image.
 * @apiSuccess {*}          template.spawnList           Template's spawn list.
 * @apiSuccess {*}          template.customCards         Template's custom cards.
 * @apiSuccess {*}          template.decks               Template's decks.
 * @apiSuccess {*}          template.users               Template's users.
 * @apiSuccess {String}     template._id                 Template's _id genereated by mongodb.
 */
Router.get("/template", template.getTemplates);



/**
 * @api {get} /template Get example templates.
 *
 * @apiName getExampleTemplates
 * @apiGroup template
 *
 * @apiSuccess {Object}     template                     Template object.
 * @apiSuccess {*[]}        template.group               Template's group.
 * @apiSuccess {*[]}        template.storedLines         Template's stored lines.
 * @apiSuccess {String}     template.title               Template's title.
 * @apiSuccess {String}     template.goal                Template's goal.
 * @apiSuccess {String}     template.image               Template's image.
 * @apiSuccess {*}          template.spawnList           Template's spawn list.
 * @apiSuccess {*}          template.customCards         Template's custom cards.
 * @apiSuccess {*}          template.decks               Template's decks.
 * @apiSuccess {*}          template.users               Template's users.
 * @apiSuccess {String}     template._id                 Template's _id genereated by mongodb.
 */
Router.get("/template/example", template.getExampleTemplate);

//  The post and upsert routings

/**
 * @api {post} /template Add a template.
 *
 * @apiName addTemplate
 * @apiGroup template
 *
 * @apiBody {Object}     template                     Template object.
 * @apiBody {*[]}        template.group               Template's group.
 * @apiBody {*[]}        template.storedLines         Template's stored lines.
 * @apiBody {String}     template.title               Template's title.
 * @apiBody {String}     template.goal                Template's goal.
 * @apiBody {String}     template.image               Template's image.
 * @apiBody {*}          template.spawnList           Template's spawn list.
 * @apiBody {*}          template.customCards         Template's custom cards.
 * @apiBody {*}          template.decks               Template's decks.
 * @apiBody {*}          template.users               Template's users.
 *
 * @apiSuccess {Object}     template                     Template object.
 * @apiSuccess {*[]}        template.group               Template's group.
 * @apiSuccess {*[]}        template.storedLines         Template's stored lines.
 * @apiSuccess {String}     template.title               Template's title.
 * @apiSuccess {String}     template.goal                Template's goal.
 * @apiSuccess {String}     template.image               Template's image.
 * @apiSuccess {*}          template.spawnList           Template's spawn list.
 * @apiSuccess {*}          template.customCards         Template's custom cards.
 * @apiSuccess {*}          template.decks               Template's decks.
 * @apiSuccess {*}          template.users               Template's users.
 * @apiSuccess {String}     template._id                 Template's _id genereated by mongodb.
 */
Router.post("/template", template.addTemplate);

module.exports = Router;
