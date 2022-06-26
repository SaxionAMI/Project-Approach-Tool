"use strict";
const Express = require("express");
const Router = Express.Router();
const workspace = require("../controllers/workspaceController.js");

//  The post and upsert routings
/**
 * @api {post} /workspace Create a workspace.
 *
 * @apiName createWorkspace
 * @apiGroup workspace
 *
 * @apiBody {Object}     workspace                        Workspace object.
 * @apiBody {*[]}        workspace.groups                 Workspace's groups.
 * @apiBody {*[]}        workspace.storedLines            Workspace's stored lines.
 * @apiBody {*[]}        workspace.users                  Workspace's users.
 * @apiBody {String}     workspace.title                  Workspace's title.
 * @apiBody {String}     workspace.goal                   Workspace's goal.
 * @apiBody {String}     workspace.image                  Workspace's image.
 * @apiBody {*}          workspace.spawnList              Workspace's spawn list.
 * @apiBody {*}          workspace.customCards            Workspace's custom cards.
 * @apiBody {*}          workspace.decks                  Workspace's decks.
 * @apiBody {String[]}   workspace.disabledRuleIds        Workspace's disable rule ids.
 * @apiBody {Boolean}    workspace.permanentDisableVT     Workspace's permanent disable VT.
 *
 * @apiSuccess {Object}     workspace                        Workspace object.
 * @apiSuccess {*[]}        workspace.groups                 Workspace's groups.
 * @apiSuccess {*[]}        workspace.storedLines            Workspace's stored lines.
 * @apiSuccess {*[]}        workspace.users                  Workspace's users.
 * @apiSuccess {String}     workspace.title                  Workspace's title.
 * @apiSuccess {String}     workspace.goal                   Workspace's goal.
 * @apiSuccess {String}     workspace.image                  Workspace's image.
 * @apiSuccess {*}          workspace.spawnList              Workspace's spawn list.
 * @apiSuccess {*}          workspace.customCards            Workspace's custom cards.
 * @apiSuccess {*}          workspace.decks                  Workspace's decks.
 * @apiSuccess {String[]}   workspace.disabledRuleIds        Workspace's disable rule ids.
 * @apiSuccess {Boolean}    workspace.permanentDisableVT     Workspace's permanent disable VT.
 * @apiSuccess {String}     workspace._id                    Workspace's Object ID in mongodb.
 */
Router.post("/workspace", workspace.postWorkspace);


/**
 * @api {post} /workspace/:_id Upsert a workspace.
 *
 * @apiName upsertWorkspace
 * @apiGroup workspace
 *
 * @apiBody {Object}     workspace                        Workspace object.
 * @apiBody {*[]}        workspace.groups                 Workspace's groups.
 * @apiBody {*[]}        workspace.storedLines            Workspace's stored lines.
 * @apiBody {*[]}        workspace.users                  Workspace's users.
 * @apiBody {String}     workspace.title                  Workspace's title.
 * @apiBody {String}     workspace.goal                   Workspace's goal.
 * @apiBody {String}     workspace.image                  Workspace's image.
 * @apiBody {*}          workspace.spawnList              Workspace's spawn list.
 * @apiBody {*}          workspace.customCards            Workspace's custom cards.
 * @apiBody {*}          workspace.decks                  Workspace's decks.
 * @apiBody {String[]}   workspace.disabledRuleIds        Workspace's disable rule ids.
 * @apiBody {Boolean}    workspace.permanentDisableVT     Workspace's permanent disable VT.
 *
 * @apiSuccess {Object}     workspace                        Workspace object.
 * @apiSuccess {*[]}        workspace.groups                 Workspace's groups.
 * @apiSuccess {*[]}        workspace.storedLines            Workspace's stored lines.
 * @apiSuccess {*[]}        workspace.users                  Workspace's users.
 * @apiSuccess {String}     workspace.title                  Workspace's title.
 * @apiSuccess {String}     workspace.goal                   Workspace's goal.
 * @apiSuccess {String}     workspace.image                  Workspace's image.
 * @apiSuccess {*}          workspace.spawnList              Workspace's spawn list.
 * @apiSuccess {*}          workspace.customCards            Workspace's custom cards.
 * @apiSuccess {*}          workspace.decks                  Workspace's decks.
 * @apiSuccess {String[]}   workspace.disabledRuleIds        Workspace's disable rule ids.
 * @apiSuccess {Boolean}    workspace.permanentDisableVT     Workspace's permanent disable VT.
 * @apiSuccess {String}     workspace._id                    Workspace's Object ID in mongodb.
 */
Router.post("/workspace/:_id", workspace.upsertWorkspaceById);






/**
 * @api {put} /workspace/:_id Update a workspace.
 *
 * @apiName updateWorkspace
 * @apiGroup workspace
 *
 * @apiBody {Object}     workspace                        Workspace object.
 * @apiBody {*[]}        workspace.groups                 Workspace's groups.
 * @apiBody {*[]}        workspace.storedLines            Workspace's stored lines.
 * @apiBody {*[]}        workspace.users                  Workspace's users.
 * @apiBody {String}     workspace.title                  Workspace's title.
 * @apiBody {String}     workspace.goal                   Workspace's goal.
 * @apiBody {String}     workspace.image                  Workspace's image.
 * @apiBody {*}          workspace.spawnList              Workspace's spawn list.
 * @apiBody {*}          workspace.customCards            Workspace's custom cards.
 * @apiBody {*}          workspace.decks                  Workspace's decks.
 * @apiBody {String[]}   workspace.disabledRuleIds        Workspace's disable rule ids.
 * @apiBody {Boolean}    workspace.permanentDisableVT     Workspace's permanent disable VT.
 *
 * @apiSuccess {Object}     workspace                        Workspace object.
 * @apiSuccess {*[]}        workspace.groups                 Workspace's groups.
 * @apiSuccess {*[]}        workspace.storedLines            Workspace's stored lines.
 * @apiSuccess {*[]}        workspace.users                  Workspace's users.
 * @apiSuccess {String}     workspace.title                  Workspace's title.
 * @apiSuccess {String}     workspace.goal                   Workspace's goal.
 * @apiSuccess {String}     workspace.image                  Workspace's image.
 * @apiSuccess {*}          workspace.spawnList              Workspace's spawn list.
 * @apiSuccess {*}          workspace.customCards            Workspace's custom cards.
 * @apiSuccess {*}          workspace.decks                  Workspace's decks.
 * @apiSuccess {String[]}   workspace.disabledRuleIds        Workspace's disable rule ids.
 * @apiSuccess {Boolean}    workspace.permanentDisableVT     Workspace's permanent disable VT.
 * @apiSuccess {String}     workspace._id                    Workspace's Object ID in mongodb.
 */
Router.put("/workspace/:_id", workspace.updateWorkspaceFields);




// this route is for getting all workspaces that belong to one user
// to make it restful, it has to be a post requst
// and the id of the user has to be submitted by request body
/**
 * @api {post} /workspaces Get workspaces that belong to a user.
 *
 * @apiName getWorkspaceOfAUser
 * @apiGroup workspace
 *
 * @apiBody {Object}        user                        user object.
 * @apiBody {String}        user.uid                    User's uid.
 *
 * @apiSuccess {Object}     workspace                        Workspace object.
 * @apiSuccess {*[]}        workspace.groups                 Workspace's groups.
 * @apiSuccess {*[]}        workspace.storedLines            Workspace's stored lines.
 * @apiSuccess {*[]}        workspace.users                  Workspace's users.
 * @apiSuccess {String}     workspace.title                  Workspace's title.
 * @apiSuccess {String}     workspace.goal                   Workspace's goal.
 * @apiSuccess {String}     workspace.image                  Workspace's image.
 * @apiSuccess {*}          workspace.spawnList              Workspace's spawn list.
 * @apiSuccess {*}          workspace.customCards            Workspace's custom cards.
 * @apiSuccess {*}          workspace.decks                  Workspace's decks.
 * @apiSuccess {String[]}   workspace.disabledRuleIds        Workspace's disable rule ids.
 * @apiSuccess {Boolean}    workspace.permanentDisableVT     Workspace's permanent disable VT.
 * @apiSuccess {String}     workspace._id                    Workspace's Object ID in mongodb.
 */

Router.post("/workspaces", workspace.getWorkspacesByUID);


//  The get routings

/**
 * @api {get} /workspace/:_id Get a workspace by id.
 *
 * @apiName getWorkspaceById
 * @apiGroup workspace
 *
 * @apiSuccess {Object}     workspace                        Workspace object.
 * @apiSuccess {*[]}        workspace.groups                 Workspace's groups.
 * @apiSuccess {*[]}        workspace.storedLines            Workspace's stored lines.
 * @apiSuccess {*[]}        workspace.users                  Workspace's users.
 * @apiSuccess {String}     workspace.title                  Workspace's title.
 * @apiSuccess {String}     workspace.goal                   Workspace's goal.
 * @apiSuccess {String}     workspace.image                  Workspace's image.
 * @apiSuccess {*}          workspace.spawnList              Workspace's spawn list.
 * @apiSuccess {*}          workspace.customCards            Workspace's custom cards.
 * @apiSuccess {*}          workspace.decks                  Workspace's decks.
 * @apiSuccess {String[]}   workspace.disabledRuleIds        Workspace's disable rule ids.
 * @apiSuccess {Boolean}    workspace.permanentDisableVT     Workspace's permanent disable VT.
 * @apiSuccess {String}     workspace._id                    Workspace's Object ID in mongodb.
 */
Router.get("/workspace/:_id", workspace.getWorkspaceById);

// this call is not restful
/**
 * @api {get} /workspace/customCard/:_id Get a workspace by custom card id.
 *
 * @apiName getWorkspaceByCustomCardId
 * @apiGroup workspace
 *
 * @apiSuccess {Object}     workspace                        Workspace object.
 * @apiSuccess {*[]}        workspace.groups                 Workspace's groups.
 * @apiSuccess {*[]}        workspace.storedLines            Workspace's stored lines.
 * @apiSuccess {*[]}        workspace.users                  Workspace's users.
 * @apiSuccess {String}     workspace.title                  Workspace's title.
 * @apiSuccess {String}     workspace.goal                   Workspace's goal.
 * @apiSuccess {String}     workspace.image                  Workspace's image.
 * @apiSuccess {*}          workspace.spawnList              Workspace's spawn list.
 * @apiSuccess {*}          workspace.customCards            Workspace's custom cards.
 * @apiSuccess {*}          workspace.decks                  Workspace's decks.
 * @apiSuccess {String[]}   workspace.disabledRuleIds        Workspace's disable rule ids.
 * @apiSuccess {Boolean}    workspace.permanentDisableVT     Workspace's permanent disable VT.
 * @apiSuccess {String}     workspace._id                    Workspace's Object ID in mongodb.
 */
Router.get("/workspace/customCard/:_id", workspace.getCustomCards);

// The delete routings
/**
 * @api {delete} /workspace/:_id Delete a workspace by id.
 *
 * @apiName deleteWorkspaceById
 * @apiGroup workspace
 *
 * @apiSuccess {Object}     workspace                        Workspace object.
 * @apiSuccess {*[]}        workspace.groups                 Workspace's groups.
 * @apiSuccess {*[]}        workspace.storedLines            Workspace's stored lines.
 * @apiSuccess {*[]}        workspace.users                  Workspace's users.
 * @apiSuccess {String}     workspace.title                  Workspace's title.
 * @apiSuccess {String}     workspace.goal                   Workspace's goal.
 * @apiSuccess {String}     workspace.image                  Workspace's image.
 * @apiSuccess {*}          workspace.spawnList              Workspace's spawn list.
 * @apiSuccess {*}          workspace.customCards            Workspace's custom cards.
 * @apiSuccess {*}          workspace.decks                  Workspace's decks.
 * @apiSuccess {String[]}   workspace.disabledRuleIds        Workspace's disable rule ids.
 * @apiSuccess {Boolean}    workspace.permanentDisableVT     Workspace's permanent disable VT.
 * @apiSuccess {String}     workspace._id                    Workspace's Object ID in mongodb.
 */
Router.delete("/workspace/:_id", workspace.deleteWorkspace);

module.exports = Router;
