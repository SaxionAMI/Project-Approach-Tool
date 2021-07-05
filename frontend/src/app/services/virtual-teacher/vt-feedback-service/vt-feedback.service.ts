import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import EventEmitter from 'events';
import { BehaviorSubject } from 'rxjs';
import { GenericApiErrorDialogComponent } from 'src/app/generic-api-error-dialog/generic-api-error-dialog.component';
import { Card } from 'src/app/models/card.model';
import { VTActionFactory } from 'src/app/models/virtual-teacher/actions/vt-action-factory';
import { VTFeedbackModel } from 'src/app/models/virtual-teacher/vt-feedback-model';
import { VTFeedbackPrimaryActionModel } from 'src/app/models/virtual-teacher/vt-feedback-primary-action-model';
import { VTWorkspaceData } from 'src/app/models/virtual-teacher/workspace-data/VTWorkspaceData';
import { Workspace } from 'src/app/models/workspace.model';
import { SocketService } from '../../socket.service';
import { WorkspaceService } from '../../workspace.service';

@Injectable({
  providedIn: 'root'
})
export class VTFeedbackService {
  static EVENT_SET_FEEDBACK_MODE = 'setFeedbackMode';

  settingsOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _events: EventEmitter = new EventEmitter();
  private _workspace: Workspace;
  private _room: String;
  private _isEnabled: boolean = false;

  get isEnabled() {
    return this._isEnabled;
  }

  constructor(
        private socketService: SocketService, 
        private actionFactory: VTActionFactory, 
        private workspaceService: WorkspaceService,
        private dialog: MatDialog) {
    this.socketService.on('virtualTeacherReady').subscribe((args: any) => {
      const arg = args[0];
      console.log(arg);
      this._isEnabled = !arg.disabled;
      if (!this._isEnabled && arg.autostart) {
        this.socketService.enableVirtualTeacher(this._room, new VTWorkspaceData(this._workspace), false);
      }
    });
    this.socketService.on('setVirtualTeacherMode').subscribe(mode => {
      this._events.emit(VTFeedbackService.EVENT_SET_FEEDBACK_MODE, mode)
    });
    this.socketService.on('enableVirtualTeacher').subscribe(() => {
      this._isEnabled = true;
    });
    this.socketService.on('disableVirtualTeacher').subscribe(() => {
      this._isEnabled = false;
      this.onFeedbackReady([]);
    });
    this.socketService.on('feedbackReady').subscribe(args => {
      this.onFeedbackReady(args[0]);
    });
    this.socketService.on('setRuleEnabled').subscribe(args => {
      this._workspace.disabledRuleIds = args[0];
    })
  }

  on(event: string, handler: (...args) => void) {
    this._events.on(event, handler);
  }

  start(room: String, workspace: Workspace) {
    this._room = room;
    this._workspace = workspace;
  }

  /**
   * Enable the virtual teacher.
   * @param force If true, also enables the virtual teacher if it was permanently 
   * disabled. This effectively resets the permanent disabled state.
   */
  enableVirtualTeacher(force: boolean) {
    this._isEnabled = true;
    this.socketService.enableVirtualTeacher(this._room, new VTWorkspaceData(this._workspace), force);
  }

  disableVirtualTeacher(temporary: boolean) {
    this._isEnabled = false;
    this._workspace.permanentDisableVT = !temporary;
    this.socketService.disableVirtualTeacher(this._room, temporary);
  }

  setFeedbackMode(mode) {
    this.socketService.setVirtualTeacherMode(this._room, mode, new VTWorkspaceData(this._workspace));
  }

  getRuleEnabled(id: string): boolean {
    return this._workspace.disabledRuleIds.findIndex(x => x == id) < 0;
  }

  setRuleEnabled(id: string, enabled: boolean) {
    this.socketService.setRuleEnabled(this._room, id, enabled, new VTWorkspaceData(this._workspace));
  }

  private onFeedbackReady(feedback: Array<VTFeedbackModel>) {
    this.resetCurrentFeedback();
    
    if (!feedback) return;
    
    feedback.forEach(x => {
      if (x)
      switch(x.type) {
        case VTFeedbackModel.TYPE_WORKSPACE:
          this.addWorkspaceFeedback(x);
          break;
        case VTFeedbackModel.TYPE_GROUP:
          this.addGroupFeedback(x);
          break;
        case VTFeedbackModel.TYPE_CARD:
          this.addCardFeedback(x);
          break;
        default: break;
      }
    });
  }

  private resetCurrentFeedback() {
    this._workspace.feedback.clear();

    this._workspace.groups.forEach(x => {
      x.feedback.clear();
      x.cards.forEach(y => y.feedback.clear());
    });
  }

  private addWorkspaceFeedback(feedback: VTFeedbackModel) {
    const action = this.createFeedbackAction(feedback.ruleId, feedback.action);
    if (!action) return;
    this._workspace.feedback.add(action);
  }

  private addGroupFeedback(feedback: VTFeedbackModel) {
    const action = this.createFeedbackAction(feedback.ruleId, feedback.action);
    if (!action) return;

    const group = this._workspace.groups.find(x => x.id == Number.parseInt(feedback.id));
    if (!group) return;
    group.feedback.add(action);
  }

  private addCardFeedback(feedback: VTFeedbackModel) {
    const action = this.createFeedbackAction(feedback.ruleId, feedback.action);
    if (!action) return;

    let card: Card;
    for(let i in this._workspace.groups) {
      card = this._workspace.groups[i].cards.find(x => x.id == feedback.id);
      if (card) break;
    }
    if (!card) return;
    card.feedback.add(action);
  }

  private createFeedbackAction(ruleId: string, actionModel: VTFeedbackPrimaryActionModel) {
    return this.actionFactory.makePrimary(ruleId, actionModel);
  }
}

export class OpenSettingsEventArgs {
  open: boolean;
  workspace: Workspace;
}
