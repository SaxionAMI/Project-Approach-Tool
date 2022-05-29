"use strict";
const Express = require("express");
const Router = Express.Router();
const workspace = require("../controllers/workspaceController.js");

//  The post and upsert routings
Router.post("/workspace", workspace.postWorkspace);
Router.post("/workspace/:_id", workspace.upsertWorkspaceById);
Router.put("/workspace/:_id", workspace.updateWorkspaceFields);

// this route is for getting all workspaces that belong to one user
// to make it restful, it has to be a post requst
// and the id of the user has to be submitted by request body
Router.post("/workspaces", workspace.getWorkspacesByUID);

//  The get routings
Router.get("/workspace/:_id", workspace.getWorkspaceById);

// this call is not restful
Router.get("/workspace/customCard/:_id", workspace.getCustomCards);

// The delete routings
Router.delete("/workspace/:_id", workspace.deleteWorkspace);

module.exports = Router;
