import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import * as config from "../config";
import { Observable } from "rxjs";
import { Group } from "../models/group.model";
import { Card } from "../models/card.model";
import { Line } from "../models/line.model";
@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect(config.socketUrl, {
      transports: ["websocket"],
    });
  }

  /**
   * This method is used to connect a socket to a room
   * @param  {string} room - the room number
   * @param  {string} uid - the uid of the user
   * @returns void
   */
  connectSocketToRoom(room: string, uid: string): void {
    this.socket.emit("connectRoom", { room, data: uid });
  }

  /**
   * This method is used to move a group on a workspace
   * @param  {string} room - the room number
   * @param  {Group} group - the group object
   * @returns void
   */
  moveGroup(room: string, group: Group): void  {
    this.socket.emit("moveGroup", { room, data: group });
  }

  /**
   * This method is used to update a title of a group
   * @param  {string} room - the room number
   * @param  {Group} group - the group object with new title
   * @returns void
   */
  updateGroupTitle(room: string, group: Group): void  {
    this.socket.emit("updateGroupTitle", { room, data: group });
  }

  /**
   * This method is used to update a workspace title
   * @param  {string} room - the room number
   * @param  {string} title - the workspace title
   * @returns void
   */
  updateWorkspaceTitle(room: string, title: string): void  {
    this.socket.emit("updateWorkspaceTitle", { room, data: title });
  }

  /**
   * This method is used to update a workspace goal
   * @param  {string} room - the room number
   * @param  {string} goal - the workspace goal
   * @returns void
   */
  updateWorkspaceGoal(room: string, goal: string): void  {
    this.socket.emit("updateWorkspaceGoal", { room, data: goal });
  }

  /**
   * This method is used to add a card to a spawnlist
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  addCardToSpawnlist(room: string, card: Card): void  {
    this.socket.emit("addCardToSpawnlist", { room, data: card });
  }

  /**
   * This method is used to move a card to a group
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  moveCardToGroup(room: string, card: Card): void  {
    this.socket.emit("moveCardToGroup", { room, data: card });
  }

  /**
   * This method is used to add a group to the workspace
   * @param  {string} room - the room number
   * @param  {Group} group - the group object
   * @returns void
   */
  addGroupToWorkspace(room: string, group: Group): void  {
    this.socket.emit("addGroupToWorkspace", { room, data: group });
  }

  /**
   * This method is used to add a arrow between 2 groups
   * @param  {string} room - the room number
   * @param  {Line} line - the arrow object
   * @returns void
   */
  addArrowToWorkspace(room: string, line: Line): void  {
    this.socket.emit("addArrowToWorkspace", { room, data: line });
  }

  /**
   * This method is used to add a question in the spawnlist
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  addQuestionToWorkspace(room: string, card: Card): void  {
    this.socket.emit("addQuestionToWorkspace", { room, data: card });
  }

  /**
   * This method is used to update a question in a group
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  updateQuestionInGroup(room: string, card: Card): void  {
    this.socket.emit("updateQuestionInGroup", { room, data: card });
  }

  /**
   * This method is used to update a card's position within a group
   * @param  {string} room - the room number
   * @param  {string[]} positions - the card positions within a group
   * @returns void
   */
  updateCardPositionWithinGroup(room: string, positions: string[]): void  {
    this.socket.emit("updateCardPositionWithinGroup", {
      room,
      data: positions,
    });
  }

  /**
   * This method is used to update a question in the spawnlist
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  updateQuestionInSpawnlist(room: string, card: Card): void  {
    this.socket.emit("updateQuestionInSpawnlist", { room, data: card });
  }

  /**
   * This method is used to remove a card from a group
   * @param  {string} room - the room number
   * @param  {{}} data - custom json object
   * @returns void
   */
  removeCardFromGroup(room: string, data: {}): void  {
    this.socket.emit("removeCardFromGroup", { room, data });
  }

  /**
   * This method is used to remove a card from the spawnlist
   * @param  {string} room - the room number
   * @param  {{}} data - custom json object
   * @returns void
   */
  removeCardFromSpawnlist(room: string, data: {}): void  {
    this.socket.emit("removeCardFromSpawnlist", { room, data });
  }

  /**
   * This method is used to update the note of a card within the spawnlist
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  updateNoteInSpawnlistCard(room: string, card: Card): void  {
    this.socket.emit("updateNoteInSpawnlistCard", { room, data: card });
  }

  /**
   * This method is used to update the note of a card within a group
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  updateNoteInGroupCard(room: string, card: Card): void  {
    this.socket.emit("updateNoteInGroupCard", { room, data: card });
  }

  /**
   * This method is used to remove a group
   * @param  {string} room - the room number
   * @param  {Group} group - the group object
   * @returns void
   */
  removeGroup(room: string, group: Group): void  {
    this.socket.emit("removeGroup", { room, data: group });
  }

  /**
   * This method creates an observable for incoming socket requests
   * @param  {string} event  - the event request name
   * @returns Observable
   */
  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }

  /**
   * This method is used to close the socket connection
   * @returns void
   */
  closeConnection(): void  {
    this.socket.emit("closeConnection", "disconnect");
  }

  /**
   * This method is used to leave a room
   * @param  {string} room - the room number
   * @returns void
   */
  leaveRoom(room: string): void  {
    this.socket.emit("leaveRoom", { room });
  }

  /**
   * This method is used to set an effect on a group
   * @param  {string} room - the room number
   * @param  {Group} group - the group object
   * @returns void
   */
  setEffectOnGroup(room: string, group: Group): void  {
    this.socket.emit("setEffectOnGroup", { room, data: group });
  }

  /**
   * This method is used to remove an effect on a group
   * @param  {string} room - the room number
   * @param  {Group} group - the group object
   * @returns void
   */
  removeEffectFromGroup(room: string, group: Group): void  {
    this.socket.emit("removeEffectFromGroup", { room, data: group });
  }

  /**
   * This method is used to set an effect on a card
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  setEffectOnCard(room: string, card: Card): void  {
    this.socket.emit("setEffectOnCard", { room, data: card });
  }

  /**
   * This method is used to remove an effect on a card
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  removeEffectFromCard(room: string, card: Card): void  {
    this.socket.emit("removeEffectFromCard", { room, data: card });
  }

  /**
   * This method is used to set an effect on a title
   * @param  {string} room  - the room number
   * @returns void
   */
  setEffectOnTitle(room: string): void  {
    this.socket.emit("setEffectOnTitle", { room });
  }

  /**
   * This method is used to remove an effect on a title
   * @param  {string} room - the room number
   */
  removeEffectFromTitle(room: string): void  {
    this.socket.emit("removeEffectFromTitle", { room });
  }

  /**
   * This method is used to set an effect on a goal
   * @param  {string} room - the room number
   * @returns void
   */
  setEffectOnGoal(room: string): void  {
    this.socket.emit("setEffectOnGoal", { room });
  }

  /**
   * This method is used to remove an effect on a goal
   * @param  {string} room - the room number
   * @returns void
   */
  removeEffectFromGoal(room: string): void  {
    this.socket.emit("removeEffectFromGoal", { room });
  }

}
