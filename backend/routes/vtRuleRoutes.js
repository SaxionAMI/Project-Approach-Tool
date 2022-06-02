"use strict";
const Express = require("express");
const Router = Express.Router();
const vtRules = require("../controllers/vtFeedbackRuleController");
const authorization = require("../authorizationModule");

/**
 * @api {get} /vt-rules Get all enabled rules.
 * 
 * @apiName getEnabledRules
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} rule                      List of enabled rules.
 * @apiSuccess {Object[]} rule.phases               List of phases.
 * @apiSuccess {Boolean} rule.configurable          Is configurable.
 * @apiSuccess {Boolean} rule.enabled               Is enabled.
 * @apiSuccess {String} rule._id                    Rule ID.
 * @apiSuccess {String} rule.title                  Title of rule.
 * @apiSuccess {String} rule.description            Description of rule.
 * @apiSuccess {Object} rule.condition              Condition object.
 * @apiSuccess {String} rule.condition.display      Condition display.
 * @apiSuccess {String} rule.condition.type         Condition type.
 * @apiSuccess {Array} rule.condition.attributes    Condition attributes.
 * @apiSuccess {Object} rule.action                 Action object.
 * @apiSuccess {String} rule.action.display         Action display.
 * @apiSuccess {String} rule.action.type            Action type.
 * @apiSuccess {Array} rule.action.attributes       Action attributes.
 * @apiSuccess {Object} rule.action.secondaryAction Action secondary action.
 */
Router.get("/vt-rules", vtRules.getEnabledRules);

/**
 * @api {get} /vt-rules/all Get all rules.
 * @apiName getRules
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} rule                      List of enabled rules.
 * @apiSuccess {Object[]} rule.phases               List of phases.
 * @apiSuccess {Boolean} rule.configurable          Is configurable.
 * @apiSuccess {Boolean} rule.enabled               Is enabled.
 * @apiSuccess {String} rule._id                    Rule ID.
 * @apiSuccess {String} rule.title                  Title of rule.
 * @apiSuccess {String} rule.description            Description of rule.
 * @apiSuccess {Object} rule.condition              Condition object.
 * @apiSuccess {String} rule.condition.display      Condition display.
 * @apiSuccess {String} rule.condition.type         Condition type.
 * @apiSuccess {Array} rule.condition.attributes    Condition attributes.
 * @apiSuccess {Object} rule.action                 Action object.
 * @apiSuccess {String} rule.action.display         Action display.
 * @apiSuccess {String} rule.action.type            Action type.
 * @apiSuccess {Array} rule.action.attributes       Action attributes.
 * @apiSuccess {Object} rule.action.secondaryAction Action secondary action.
 */
Router.get("/vt-rules/all", authorization.hasRole(['teacher','admin']), vtRules.getRules);

/**
 * @api {get} /vt-rules/actions Get actions.
 * 
 * @apiName getActions
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} action                List of actions.
 * @apiSuccess {String} action._id              Action ID.
 * @apiSuccess {String} action.type             Action type.
 * @apiSuccess {String} action.display          Action display.
 * @apiSuccess {Boolean} action.primary         Is primary.
 * @apiSuccess {Boolean} action.selectable      Is selectable.
 */
Router.get("/vt-rules/actions", authorization.hasRole(['teacher','admin']), vtRules.getActions);

/**
 * @api {get} /vt-rules/conditions Get conditions.
 * 
 * @apiName getConditions
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} condition                         List of conditions.
 * @apiSuccess {String} condition._id                       Condition ID.
 * @apiSuccess {String} condition.display                   Condition display.
 * @apiSuccess {String} condition.type                      Condition type.
 * @apiSuccess {String} condition.archetype                 Condition archetype.
 * @apiSuccess {Boolean} condition.supportsMultiCondition   Does support multi condition.
 * @apiSuccess {Boolean} condition.canBeRootCondition       Can be root condition.
 * @apiSuccess {Boolean} condition.selectable               Is selectable.
 * @apiSuccess {String} condition.description               Condition description.
 */
Router.get("/vt-rules/conditions", authorization.hasRole(['teacher','admin']), vtRules.getConditions);

/**
 * @api {get} /vt-rules/comparisons Get comparisons.
 * 
 * @apiName getComparisons
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} comparison            List of comparisons.
 * @apiSuccess {String} comparison._id          Comparison ID.
 * @apiSuccess {String} comparison.type         Comparison type.
 * @apiSuccess {String} comparison.display      Comparison display.
 */
Router.get("/vt-rules/comparisons", authorization.hasRole(['teacher','admin']), vtRules.getComparisons);

/**
 * @api {get} /vt-rules/scopes Get scopes.
 * 
 * @apiName getScopes
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} scope         List of scopes.
 * @apiSuccess {String} scope._id       Scope ID.
 * @apiSuccess {String} scope.display   Scope display.
 * @apiSuccess {String} scope.workspace Scope workspace.
 */
Router.get("/vt-rules/scopes", authorization.hasRole(['teacher','admin']), vtRules.getScopes);

/**
 * @api {get} /vt-rules/catalog-tabs Get catalog tabs
 * 
 * @apiName getCatelogTabs
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} tab       List of catelog tabs.
 * @apiSuccess {String} tab._id     Tab ID.
 * @apiSuccess {String} tab.type    Tab type.
 * @apiSuccess {String} tab.display Tab display.
 */
Router.get("/vt-rules/catalog-tabs", authorization.hasRole(['teacher','admin']), vtRules.getCatalogTabs);

/**
 * @api {get} /vt-rules/severities Get severities
 * 
 * @apiName getSeverities
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} severity          List of severities
 * @apiSuccess {String} severity._id        Severity ID.
 * @apiSuccess {String} severity.type       Severity type.
 * @apiSuccess {String} severity.display    Severity display.
 * @apiSuccess {Boolean} severity.selectable Is severity selectable.
 */
Router.get("/vt-rules/severities", authorization.hasRole(['teacher','admin']), vtRules.getSeverities);

/**
 * @api {get} /vt-rules/phases Get Phases
 * 
 * @apiName getPhases
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} phase             List of phases.
 * @apiSuccess {String} phase._id           Phase ID.
 * @apiSuccess {String} phase.type          Phase type.
 * @apiSuccess {String} phase.display       Phase display.
 * @apiSuccess {Boolean} phase.selectable   Is phase selectable.
 */
Router.get("/vt-rules/phases", authorization.hasRole(['teacher','admin']), vtRules.getPhases);

/**
 * @api {get} /vt-rules/strategies Get strategies
 * 
 * @apiName getStrategies
 * @apiGroup vtRules
 *
 * @apiSuccess {Object[]} strategy          List of strategies
 * @apiSuccess {String} strategy._id        Strategy ID.
 * @apiSuccess {String} strategy.display    Strategy display.
 * @apiSuccess {String} strategy.identifier Strategy identifier.
 */
Router.get("/vt-rules/strategies", authorization.hasRole(['teacher','admin']), vtRules.getStrategies);

/**
 * @api {post} /vt-rules Create a new rule
 * 
 * @apiName createRule
 * @apiGroup vtRules
 *
 * @apiBody {String} title              Rule title.
 * @apiBody {String} description        Rule description.
 * @apiBody {Object[]} phase            List of rule phases.
 * @apiBody {String} phase.display      Phase display.
 * @apiBody {String} phase.identifier   Phase identifier.
 * @apiBody {Object} condition          Rule condition object.
 * @apiBody {Object} action             Rule action object.
 * @apiBody {Boolean} enabled           Is rule enabled.
 * 
 * @apiSuccess {String} _id                 Rule ID.
 * @apiSuccess {String} title               Rule title.
 * @apiSuccess {String} description         Rule description.
 * @apiSuccess {Object[]} phase             List of rule phases.
 * @apiSuccess {String} phase.display       Phase display.
 * @apiSuccess {String} phase.identifier    Phase identifier.
 * @apiSuccess {Object} condition           Rule condition object.
 * @apiSuccess {Object} action              Rule action object.
 * @apiSuccess {Boolean} enabled            Is rule enabled.
 * @apiSuccess {Boolean} configurable       Is rule configurable.
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
