const rooms = [];
const uniqolor = require("uniqolor");
// socket controller

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    // what happens when a disconnection is made
    socket.on("disconnect", () => {
      console.log("user disconnected");

      for (let i = 0; i < rooms.length; i++) {
        const index = rooms[i].active.findIndex(
          (active) => active.socket == socket.id
        );
        if (index > -1) {
          rooms[i].active.splice(index, 1);
          io.to(rooms[index]).emit("joinWorkspace", rooms[index]);
        }
      }
    });

    //  Connect a socket to a room
    socket.on("connectRoom", (event) => {
      socket.join(event.room.toString());
      if (!rooms.find((room) => room.id === event.room)) {
        rooms.push({
          id: event.room,
          active: [],
        });
      }
      const index = rooms.findIndex((room) => room.id === event.room);
      rooms[index].active.push({
        socket: socket.id,
        user: event.data,
        color: uniqolor.random().color,
      });
      sleep(2000); // sleep is necassery to load the workspace
      io.to(event.room).emit("joinWorkspace", rooms[index]);
    });

    //  Move a group within a workspace
    socket.on("moveGroup", (event) => {
      socket.to(event.room).emit("moveGroup", event.data);
    });

    //  Update a group's title within a workspace
    socket.on("updateGroupTitle", (event) => {
      socket.to(event.room).emit("updateGroupTitle", event.data);
    });

    //  Update a workspace's title within a workspace
    socket.on("updateWorkspaceTitle", (event) => {
      socket.to(event.room).emit("updateWorkspaceTitle", event.data);
    });

    //  Update a workspace's goal within a workspace
    socket.on("updateWorkspaceGoal", (event) => {
      socket.to(event.room).emit("updateWorkspaceGoal", event.data);
    });

    //  Add a card to the spawnlist
    socket.on("addCardToSpawnlist", (event) => {
      socket.to(event.room).emit("addCardToSpawnlist", event.data);
    });

    //  Move a card from a group/the spawnlist to another group
    socket.on("moveCardToGroup", (event) => {
      socket.to(event.room).emit("moveCardToGroup", event.data);
    });

    //  Add a group to the workspace
    socket.on("addGroupToWorkspace", (event) => {
      socket.to(event.room).emit("addGroupToWorkspace", event.data);
    });

    //  Add a arrow to the workspace
    socket.on("addArrowToWorkspace", (event) => {
      socket.to(event.room).emit("addArrowToWorkspace", event.data);
    });

    //  Add a question to the workspace
    socket.on("addQuestionToWorkspace", (event) => {
      socket.to(event.room).emit("addQuestionToWorkspace", event.data);
    });

    //  Update a question from a group in a workspace
    socket.on("updateQuestionInGroup", (event) => {
      socket.to(event.room).emit("updateQuestionInGroup", event.data);
    });

    //  Update a cards position within a group
    socket.on("updateCardPositionWithinGroup", (event) => {
      socket.to(event.room).emit("updateCardPositionWithinGroup", event.data);
    });

    //  Update a question within a spawnlist
    socket.on("updateQuestionInSpawnlist", (event) => {
      socket.to(event.room).emit("updateQuestionInSpawnlist", event.data);
    });

    //  Remove a card from a group
    socket.on("removeCardFromGroup", (event) => {
      socket.to(event.room).emit("removeCardFromGroup", event.data);
    });

    //  Remove a card from the spawnlist
    socket.on("removeCardFromSpawnlist", (event) => {
      socket.to(event.room).emit("removeCardFromSpawnlist", event.data);
    });

    //  Update the note of a card in a spawnlist
    socket.on("updateNoteInSpawnlistCard", (event) => {
      socket.to(event.room).emit("updateNoteInSpawnlistCard", event.data);
    });

    //  Update the note of a card in a group
    socket.on("updateNoteInGroupCard", (event) => {
      socket.to(event.room).emit("updateNoteInGroupCard", event.data);
    });

    //  Removes a group from the workspace
    socket.on("removeGroup", (event) => {
      socket.to(event.room).emit("removeGroup", event.data);
    });

    //  Set the effect on the targetted group
    socket.on("setEffectOnGroup", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket
        .to(event.room)
        .emit("setEffectOnGroup", { color: color, group: event.data });
    });

    //  Remove the effect on the targetted group
    socket.on("removeEffectFromGroup", (event) => {
      socket.to(event.room).emit("removeEffectFromGroup", event.data);
    });

    //  Set the effect on the targetted card
    socket.on("setEffectOnCard", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket
        .to(event.room)
        .emit("setEffectOnCard", { color: color, card: event.data });
    });

    //  Remove the effect on the targetted card
    socket.on("removeEffectFromCard", (event) => {
      socket.to(event.room).emit("removeEffectFromCard", event.data);
    });

    //  Set the effect on the targetted title of the workspace
    socket.on("setEffectOnTitle", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket.to(event.room).emit("setEffectOnTitle", { color: color });
    });

    //  Remove the effect on the targetted title of the workspace
    socket.on("removeEffectFromTitle", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket.to(event.room).emit("removeEffectFromTitle", { color: color });
    });

    //  Set the effect on the targetted goal of the workspace
    socket.on("setEffectOnGoal", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket.to(event.room).emit("setEffectOnGoal", { color: color });
    });

    //  Remove the effect on the targetted goal of the workspace
    socket.on("removeEffectFromGoal", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket.to(event.room).emit("removeEffectFromGoal", { color: color });
    });

    //  Disconnect a socket from a room
    socket.on("leaveRoom", (event) => {
      socket.leave(event.room);
      for (let i = 0; i < rooms.length; i++) {
        const index = rooms[i].active.findIndex(
          (active) => active.socket == socket.id
        );
        rooms[i].active.splice(index, 1);
        socket.to(rooms[i].id).emit("joinWorkspace", rooms[i]);
      }
    });

    //  Close the socket connection
    socket.on("closeConnection", () => {
      socket.disconnect();
    });
  });
};

/**
 * The amount of milliseconds to sleep
 * @param  {number} milliseconds
 */
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
