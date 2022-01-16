"use strict";
const Express = require("express");
const Router = Express.Router();
const workspace = require("../controllers/workspaceController.js");

//  The post and upsert routings
Router.post("/workspace", workspace.postWorkspace);
Router.post("/workspace/:_id", workspace.upsertWorkspaceById);
Router.put("/workspace/:_id", workspace.updateWorkspaceFields);
Router.post("/workspaces", workspace.getWorkspacesByUID);

//  The get routings
Router.get("/workspace/:_id", workspace.getWorkspaceById);
Router.get("/workspace/customCard/:_id", workspace.getCustomCards);

// The delete routings
Router.delete("/workspace/:_id", workspace.deleteWorkspace);

module.exports = Router;
