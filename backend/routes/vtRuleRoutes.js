"use strict";
const Express = require("express");
const Router = Express.Router();
const vtRules = require("../controllers/vtFeedbackRuleController");
const authorization = require("../authorizationModule");

/**
 * @api {get} /vt-rules Request
 * @apiName getEnabledRules
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} rules     List of enabled rules.
 */
Router.get("/vt-rules", vtRules.getEnabledRules);

/**
 * @api {get} /vt-rules/all Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.get("/vt-rules/all", authorization.hasRole(['teacher','admin']), vtRules.getRules);

/**
 * @api {get} /vt-rules/actions Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.get("/vt-rules/actions", authorization.hasRole(['teacher','admin']), vtRules.getActions);

/**
 * @api {get} /vt-rules/conditions Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.get("/vt-rules/conditions", authorization.hasRole(['teacher','admin']), vtRules.getConditions);

/**
 * @api {get} /vt-rules/comparisons Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.get("/vt-rules/comparisons", authorization.hasRole(['teacher','admin']), vtRules.getComparisons);

/**
 * @api {get} /vt-rules/scopes Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.get("/vt-rules/scopes", authorization.hasRole(['teacher','admin']), vtRules.getScopes);

/**
 * @api {get} /vt-rules/catalog-tabs Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.get("/vt-rules/catalog-tabs", authorization.hasRole(['teacher','admin']), vtRules.getCatalogTabs);

/**
 * @api {get} /vt-rules/severities Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.get("/vt-rules/severities", authorization.hasRole(['teacher','admin']), vtRules.getSeverities);

/**
 * @api {get} /vt-rules/phases Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.get("/vt-rules/phases", authorization.hasRole(['teacher','admin']), vtRules.getPhases);

/**
 * @api {get} /vt-rules/strategies Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.get("/vt-rules/strategies", authorization.hasRole(['teacher','admin']), vtRules.getStrategies);

/**
 * @api {post} /vt-rules Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.post("/vt-rules", authorization.hasRole(['teacher','admin']), vtRules.createRule);

/**
 * @api {post} /vt-rules/:_id Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.post("/vt-rules/:_id", authorization.hasRole(['teacher','admin']), vtRules.updateRule);

/**
 * @api {post} /vt-rules/:_id/set-enabled Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.post("/vt-rules/:_id/set-enabled", authorization.hasRole(['teacher','admin']), vtRules.setRuleEnabled);

/**
 * @api {delete} /vt-rules/:_id Request
 * @apiName get
 * @apiGroup vtRules
 *
 */
Router.delete("/vt-rules/:_id", authorization.hasRole(['teacher','admin']), vtRules.deleteRule);

module.exports = Router;
