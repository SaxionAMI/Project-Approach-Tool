import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import * as config from "@app/config";
import { Observable } from "rxjs";
import { Group } from "@app/core/models/group.model";
import { Card } from "@app/core/models/card.model";
import { Line } from "@app/core/models/line.model";
import { VTWorkspaceData } from "@app/core/models/virtual-teacher/workspace-data/VTWorkspaceData";
import { Workspace } from "@app/core/models/workspace.model";
@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socket: Socket;

  constructor() {
    console.log('creating new socket service...');
    this.socket = io(config.socketUrl, {
      forceNew: true,
      transports: ["websocket"]
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
  moveGroup(room: string, group: Group, workspace: VTWorkspaceData): void  {
    this.socket.emit("moveGroup", { room, data: group.data(), workspace: workspace });
  }

  /**
   * This method is used to update a title of a group
   * @param  {string} room - the room number
   * @param  {Group} group - the group object with new title
   * @returns void
   */
  updateGroupTitle(room: string, group: Group, workspace: VTWorkspaceData): void  {
    this.socket.emit("updateGroupTitle", { room, data: group.data(), workspace: workspace });
  }

  /**
   * This method is used to update a workspace title
   * @param  {string} room - the room number
   * @param  {string} title - the workspace title
   * @returns void
   */
  updateWorkspaceTitle(room: string, title: string, workspace: VTWorkspaceData): void  {
    this.socket.emit("updateWorkspaceTitle", { room, data: title, workspace: workspace });
  }

  /**
   * This method is used to update a workspace goal
   * @param  {string} room - the room number
   * @param  {string} goal - the workspace goal
   * @returns void
   */
  updateWorkspaceGoal(room: string, goal: string, workspace: VTWorkspaceData): void  {
    this.socket.emit("updateWorkspaceGoal", { room, data: goal, workspace: workspace });
  }

  /**
   * This method is used to add a card to a spawnlist
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  addCardToSpawnlist(room: string, card: Card, workspace: VTWorkspaceData): void  {
    this.socket.emit("addCardToSpawnlist", { room, data: card, workspace: workspace });
  }

  /**
   * This method is used to move a card to a group
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  moveCardToGroup(room: string, value: any, workspace: VTWorkspaceData): void  {
    this.socket.emit("moveCardToGroup", { room, data: value, workspace: workspace});
  }

  /**
   * This method is used to add a group to the workspace
   * @param  {string} room - the room number
   * @param  {Group} group - the group object
   * @returns void
   */
  addGroupToWorkspace(room: string, group: Group, workspace: VTWorkspaceData): void  {
    this.socket.emit("addGroupToWorkspace", { room, data: group.data(), workspace: workspace });
  }

  /**
   * This method is used to add a arrow between 2 groups
   * @param  {string} room - the room number
   * @param  {Line} line - the arrow object
   * @returns void
   */
  addArrowToWorkspace(room: string, line: Line, workspace: VTWorkspaceData): void  {
    this.socket.emit("addArrowToWorkspace", { room, data: line, workspace: workspace });
  }

  /**
   * This method is used to add a question in the spawnlist
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  addQuestionToWorkspace(room: string, card: Card, workspace: VTWorkspaceData): void  {
    this.socket.emit("addQuestionToWorkspace", { room, data: card.data(), workspace: workspace });
  }

  /**
   * This method is used to update a question in a group
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  updateQuestionInGroup(room: string, card: Card, workspace: VTWorkspaceData): void  {
    this.socket.emit("updateQuestionInGroup", { room, data: card.data(), workspace: workspace });
  }

  /**
   * This method is used to update a card's position within a group
   * @param  {string} room - the room number
   * @param  {string[]} positions - the card positions within a group
   * @returns void
   */
  updateCardPositionWithinGroup(room: string, positions: string[], workspace: VTWorkspaceData): void  {
    this.socket.emit("updateCardPositionWithinGroup", {
      room,
      data: positions,
      workspace: workspace
    });
  }

  /**
   * This method is used to update a question in the spawnlist
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  updateQuestionInSpawnlist(room: string, card: Card, workspace: VTWorkspaceData): void  {
    this.socket.emit("updateQuestionInSpawnlist", { room, data: card.data(), workspace: workspace });
  }

  /**
   * This method is used to remove a card from a group
   * @param  {string} room - the room number
   * @param  {{}} data - custom json object
   * @returns void
   */
  removeCardFromGroup(room: string, data: any, workspace: VTWorkspaceData): void  {
    this.socket.emit("removeCardFromGroup", { room, data: data, workspace: workspace });
  }

  /**
   * This method is used to remove a card from the spawnlist
   * @param  {string} room - the room number
   * @param  {{}} data - custom json object
   * @returns void
   */
  removeCardFromSpawnlist(room: string, data: any, workspace: VTWorkspaceData): void  {
    this.socket.emit("removeCardFromSpawnlist", { room, data: data, workspace: workspace });
  }

  /**
   * This method is used to update the note of a card within the spawnlist
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  updateNoteInSpawnlistCard(room: string, card: Card, workspace: VTWorkspaceData): void  {
    this.socket.emit("updateNoteInSpawnlistCard", { room, data: card.data(), workspace: workspace });
  }

  /**
   * This method is used to update the note of a card within a group
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  updateNoteInGroupCard(room: string, card: Card, workspace: VTWorkspaceData): void  {
    this.socket.emit("updateNoteInGroupCard", { room, data: new Card(card).data(), workspace: workspace});
  }

  /**
   * This method is used to remove a group
   * @param  {string} room - the room number
   * @param  {Group} group - the group object
   * @returns void
   */
  removeGroup(room: string, group: Group, workspace: VTWorkspaceData): void  {
    this.socket.emit("removeGroup", { room, data: group.data(), workspace: workspace});
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
    this.socket.emit("setEffectOnGroup", { room, data: group.data() });
  }

  /**
   * This method is used to remove an effect on a group
   * @param  {string} room - the room number
   * @param  {Group} group - the group object
   * @returns void
   */
  removeEffectFromGroup(room: string, group: Group): void  {
    this.socket.emit("removeEffectFromGroup", { room, data: group.data() });
  }

  /**
   * This method is used to set an effect on a card
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  setEffectOnCard(room: string, card: Card): void  {
    this.socket.emit("setEffectOnCard", { room, data: card.data() });
  }

  /**
   * This method is used to remove an effect on a card
   * @param  {string} room - the room number
   * @param  {Card} card - the card object
   * @returns void
   */
  removeEffectFromCard(room: string, card: Card): void  {
    this.socket.emit("removeEffectFromCard", { room, data: card.data() });
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

  /**
   * Sends a signal to the back-end to turn on the virtual teacher.
   * @param room The room to enable VT for.
   * @param workspace optional: when passed along, will automatically start a feedback analysis on the entire workspace.
   */
  enableVirtualTeacher(room: String, workspace: VTWorkspaceData, force: boolean) {
    this.socket.emit('enableVirtualTeacher', { room: room, workspace: workspace, forceEnable: force});
  }

  /**
   * Sends a signal to the back-end to turn off the virtual teacher.
   * @param room The room to disable VT for.
   */
  disableVirtualTeacher(room: String, temporary: boolean) {
    this.socket.emit('disableVirtualTeacher', { room: room, data: {temporary: temporary}});
  }

  /**
   * Sends a signal to the back-end to change the virtual teacher's feedback mode.
   * @param room The room to change VT mode for.
   * @param mode The new mode to set the VT to.
   */
  setVirtualTeacherMode(room: String, mode: String, workspace: VTWorkspaceData) {
    this.socket.emit('setVirtualTeacherMode', { room: room, data: mode, workspace: workspace});
  }

  setRuleEnabled(room: String, ruleId: string, enabled: boolean, workspace: VTWorkspaceData) {
    this.socket.emit('setRuleEnabled', {room: room, ruleId: ruleId, enabled: enabled, workspace: workspace});
  }


  /**
   * Sends a manual trigger signal to the virtual teacher to generate feedback.
   * @param room The room to change VT mode for.
   * @param mode The workspace data to generate feedback for.
   */
  generateFeedback(room: String, workspace: VTWorkspaceData) {
    this.socket.emit('generateFeedback', { room: room, workspace: workspace});
  }
}
