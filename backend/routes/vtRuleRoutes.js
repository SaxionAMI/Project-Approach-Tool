"use strict";
const Express = require("express");
const Router = Express.Router();
const vtRules = require("../controllers/vtFeedbackRuleController");
const authorization = require("../authorizationModule");

Router.get("/vt-rules", vtRules.getEnabledRules);
Router.get("/vt-rules/all", authorization.hasRole(['teacher','admin']), vtRules.getRules);
Router.get("/vt-rules/actions", authorization.hasRole(['teacher','admin']), vtRules.getActions);
Router.get("/vt-rules/conditions", authorization.hasRole(['teacher','admin']), vtRules.getConditions);
Router.get("/vt-rules/comparisons", authorization.hasRole(['teacher','admin']), vtRules.getComparisons);
Router.get("/vt-rules/scopes", authorization.hasRole(['teacher','admin']), vtRules.getScopes);
Router.get("/vt-rules/catalog-tabs", authorization.hasRole(['teacher','admin']), vtRules.getCatalogTabs);
Router.get("/vt-rules/severities", authorization.hasRole(['teacher','admin']), vtRules.getSeverities);
Router.get("/vt-rules/phases", authorization.hasRole(['teacher','admin']), vtRules.getPhases);
Router.get("/vt-rules/strategies", authorization.hasRole(['teacher','admin']), vtRules.getStrategies);

Router.post("/vt-rules", authorization.hasRole(['teacher','admin']), vtRules.createRule);
Router.post("/vt-rules/:_id", authorization.hasRole(['teacher','admin']), vtRules.updateRule);
Router.post("/vt-rules/:_id/set-enabled", authorization.hasRole(['teacher','admin']), vtRules.setRuleEnabled);

Router.delete("/vt-rules/:_id", authorization.hasRole(['teacher','admin']), vtRules.deleteRule);

module.exports = Router;
