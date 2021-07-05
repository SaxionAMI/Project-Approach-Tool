const sockets = [];
const rooms = [];
const uniqolor = require("uniqolor");
const events = require('events');

//The socket controller handles all websocket traffic. With the introduction 
//of the Virtual Teacher, it also emits connection- and data related events.
//Other application parts such as the virtual teacher can hook onto those 
//events to perform tasks in response to client - or data changes.
module.exports = function (io) {
  let connectEventEmitter = new events.EventEmitter();

  io.on("connection", (socket) => {
    //const existingSocket = sockets.find(x => x.id == socket.id);
    sockets.push(socket.id);
    console.log(sockets);
    console.log("a user connected");

    //In case of a back-end restart, the clients might still be in a room 
    //on their end, but the back-end "forgets" this on restart. Therefore,
    //the back-end requests to the clients to rejoin their current room (if any).
    io.to(socket.id).emit('rejoinRoomIfAny');

    // what happens when a disconnection is made
    socket.on("disconnect", () => {
      sockets.pop(socket.id);
      console.log(sockets);
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
      socket.removeAllListeners();
    });

    //  Connect a socket to a room
    socket.on("connectRoom", async (event) => {
      console.log('joining room ' + event.room);
      socket.join(event.room.toString());
      if (!rooms.find((room) => room.id === event.room)) {
        console.log('creating new room for user...');
        let workspaceEventEmitter = new events.EventEmitter();
        rooms.push({
          id: event.room,
          active: [],
          emitter: workspaceEventEmitter,
          emit(eventName, ...args) {
            io.to(event.room).emit(eventName, args)
          },
          emitTo(recipientSocketId, eventName, ...args) {
            io.to(recipientSocketId).emit(eventName, args);
          }
        });
      }

      const index = rooms.findIndex((room) => room.id === event.room);
      const existingWithSameSocketId = rooms[index].active.findIndex(x => x.socket == socket.id && x.user == event.data);
      if (existingWithSameSocketId < 0) {
        rooms[index].active.push({
          socket: socket.id,
          user: event.data,
          color: uniqolor.random().color,
          emit(event, args) {
            io.to(socket.id).emit(event, args)
          }
        });
        await sleep(2000); // sleep is necessary to load the workspace
        io.to(event.room).emit("joinWorkspace", rooms[index]);
        connectEventEmitter.emit('joinWorkspace', rooms[index], socket.id);
      }
    });

    //  Move a group within a workspace
    socket.on("moveGroup", (event) => {
      socket.to(event.room).emit("moveGroup", event.data);
      emit(socket, 'moveGroup', event.data, event.workspace);
    });

    //  Update a group's title within a workspace
    socket.on("updateGroupTitle", (event) => {
      socket.to(event.room).emit("updateGroupTitle", event.data);
      emit(socket, 'updateGroupTitle', event.data, event.workspace);
    });

    //  Update a workspace's title within a workspace
    socket.on("updateWorkspaceTitle", (event) => {
      socket.to(event.room).emit("updateWorkspaceTitle", event.data);
      emit(socket, 'updateWorkspaceTitle', event.data, event.workspace);
    });

    //  Update a workspace's goal within a workspace
    socket.on("updateWorkspaceGoal", (event) => {
      socket.to(event.room).emit("updateWorkspaceGoal", event.data);
      emit(socket, 'updateWorkspaceGoal', event.data, event.workspace);
    });

    //  Add a card to the spawnlist
    socket.on("addCardToSpawnlist", (event) => {
      socket.to(event.room).emit("addCardToSpawnlist", event.data);
      emit(socket, 'addCardToSpawnlist', event.data, event.workspace);
    });

    //  Move a card from a group/the spawnlist to another group
    socket.on("moveCardToGroup", (event) => {
      socket.to(event.room).emit("moveCardToGroup", event.data);
      emit(socket, 'moveCardToGroup', event.data, event.workspace);
    });

    //  Add a group to the workspace
    socket.on("addGroupToWorkspace", (event) => {
      socket.to(event.room).emit("addGroupToWorkspace", event.data);
      emit(socket, 'addGroupToWorkspace', event.data, event.workspace);
    });

    //  Add a arrow to the workspace
    socket.on("addArrowToWorkspace", (event) => {
      socket.to(event.room).emit("addArrowToWorkspace", event.data);
      emit(socket, 'addArrowToWorkspace', event.data, event.workspace);
    });

    //  Add a question to the workspace
    socket.on("addQuestionToWorkspace", (event) => {
      socket.to(event.room).emit("addQuestionToWorkspace", event.data);
      emit(socket, 'addQuestionToWorkspace', event.data, event.workspace);
    });

    //  Update a question from a group in a workspace
    socket.on("updateQuestionInGroup", (event) => {
      socket.to(event.room).emit("updateQuestionInGroup", event.data);
      emit(socket, 'updateQuestionInGroup', event.data, event.workspace);
    });

    //  Update a cards position within a group
    socket.on("updateCardPositionWithinGroup", (event) => {
      socket.to(event.room).emit("updateCardPositionWithinGroup", event.data);
      emit(socket, 'updateCardPositionWithinGroup', event.data, event.workspace);
    });

    //  Update a question within a spawnlist
    socket.on("updateQuestionInSpawnlist", (event) => {
      socket.to(event.room).emit("updateQuestionInSpawnlist", event.data);
      emit(socket, 'updateQuestionInSpawnlist', event.data, event.workspace);
    });

    //  Remove a card from a group
    socket.on("removeCardFromGroup", (event) => {
      socket.to(event.room).emit("removeCardFromGroup", event.data);
      emit(socket, 'removeCardFromGroup', event.data, event.workspace);
    });

    //  Remove a card from the spawnlist
    socket.on("removeCardFromSpawnlist", (event) => {
      socket.to(event.room).emit("removeCardFromSpawnlist", event.data);
      emit(socket, 'removeCardFromSpawnlist', event.data, event.workspace);
    });

    //  Update the note of a card in a spawnlist
    socket.on("updateNoteInSpawnlistCard", (event) => {
      socket.to(event.room).emit("updateNoteInSpawnlistCard", event.data);
      emit(socket, 'updateNoteInSpawnlistCard', event.data, event.workspace);
    });

    //  Update the note of a card in a group
    socket.on("updateNoteInGroupCard", (event) => {
      socket.to(event.room).emit("updateNoteInGroupCard", event.data);
      emit(socket, 'updateNoteInGroupCard', event.data, event.workspace);
    });

    //  Removes a group from the workspace
    socket.on("removeGroup", (event) => {
      socket.to(event.room).emit("removeGroup", event.data);
      emit(socket, 'removeGroup', event.data, event.workspace);
    });

    //  Set the effect on the targetted group
    socket.on("setEffectOnGroup", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket
        .to(event.room)
        .emit("setEffectOnGroup", { color: color, group: event.data });
      emit(socket, 'setEffectOnGroup', { color: color, group: event.data });
    });

    //  Remove the effect on the targetted group
    socket.on("removeEffectFromGroup", (event) => {
      socket.to(event.room).emit("removeEffectFromGroup", event.data);
      emit(socket, 'removeEffectFromGroup', event.data);
    });

    //  Set the effect on the targetted card
    socket.on("setEffectOnCard", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket
        .to(event.room)
        .emit("setEffectOnCard", { color: color, card: event.data });
      emit(socket, 'setEffectOnCard', { color: color, card: event.data });
    });

    //  Remove the effect on the targetted card
    socket.on("removeEffectFromCard", (event) => {
      socket.to(event.room).emit("removeEffectFromCard", event.data);
      emit(socket, 'removeEffectFromCard', event.data);
    });

    //  Set the effect on the targetted title of the workspace
    socket.on("setEffectOnTitle", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket.to(event.room).emit("setEffectOnTitle", { color: color });
      emit(socket, 'setEffectOnTitle', { color: color });
    });

    //  Remove the effect on the targetted title of the workspace
    socket.on("removeEffectFromTitle", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket.to(event.room).emit("removeEffectFromTitle", { color: color });
      emit(socket, 'removeEffectFromTitle', { color: color });
    });

    //  Set the effect on the targetted goal of the workspace
    socket.on("setEffectOnGoal", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket.to(event.room).emit("setEffectOnGoal", { color: color });
      emit(socket, 'setEffectOnGoal', { color: color });
    });

    //  Remove the effect on the targetted goal of the workspace
    socket.on("removeEffectFromGoal", (event) => {
      const room = rooms.find((room) => room.id == event.room);
      const color = room.active.find((active) => active.socket == socket.id)
        .color;
      socket.to(event.room).emit("removeEffectFromGoal", { color: color });
      emit(socket, 'removeEffectFromGoal', { color: color });
    });

    //  Disconnect a socket from a room
    socket.on("leaveRoom", (event) => {
      socket.leave(event.room);
      //Upon leaving room, remove socket from room
      for (let i = 0; i < rooms.length; i++) {
        const index = rooms[i].active.findIndex(
          (active) => active.socket == socket.id
        );
        if (index < 0) continue; //user was not in this room.

        rooms[i].active.splice(index, 1);
        socket.to(rooms[i].id).emit("joinWorkspace", rooms[i]);
        connectEventEmitter.emit('leaveWorkspace', rooms[i]);
      }
    });

    //  Close the socket connection
    socket.on("closeConnection", () => {
      socket.disconnect();
    });


    //------Virtual teacher events
    //Enable the virtual teacher associated with this room.
    socket.on('enableVirtualTeacher', event => {
      emit(socket, 'enableVirtualTeacher', event.workspace, event.forceEnable);
    })

    //Disable the virtual teacher associated with this room.
    socket.on('disableVirtualTeacher', event => {
      emit(socket, 'disableVirtualTeacher', event.data);
    })

    //Set the feedback mode of the virtual teacher associated with this room.
    socket.on('setVirtualTeacherMode', (event) => {
      emit(socket, 'setVirtualTeacherMode', event.data, event.workspace);
    })

    //Set the feedback mode of the virtual teacher associated with this room.
    socket.on('generateFeedback', (event) => {
      emit(socket, 'generateFeedback', event.workspace);
    })

    socket.on('setRuleEnabled', (event) => {
      emit(socket, 'setRuleEnabled', event.ruleId, event.enabled);
    })
  });
  return connectEventEmitter;
};

/**
 * The amount of milliseconds to sleep
 * @param  {number} milliseconds
 */
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function getRoom(socket) {
  let roomIndex = -1;
  for (let i = 0; i < rooms.length && roomIndex < 0; i++) {
    const index = rooms[i].active.findIndex(
      (active) => active.socket == socket.id
    );
    if (index < 0) continue; //user was not in this room.
    
    roomIndex = i;
    return rooms[roomIndex];
  }
}

function emit(socket, event, ...data) {
  let room = getRoom(socket);
  if (!room || !room.emitter) return;
  room.emitter.emit(event, data);
}
