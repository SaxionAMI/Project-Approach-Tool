import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VTRule } from 'src/app/models/virtual-teacher/rules/vt-rule';
import { VTFeedbackService } from 'src/app/services/virtual-teacher/vt-feedback-service/vt-feedback.service';
import { VtDisableDialogComponent } from '../vt-disable-dialog/vt-disable-dialog.component';

@Component({
  selector: 'app-vt-settings-student',
  templateUrl: './vt-settings-student.component.html',
  styleUrls: ['./vt-settings-student.component.css']
})
export class VtSettingsStudentComponent implements OnInit {

  getIsRuleEnabled = (rule: VTRule) => {
    return this.feedbackService.getRuleEnabled(rule._id);
  }

  setIsRuleEnabled = (rule: VTRule, value: boolean) => {
    this.feedbackService.setRuleEnabled(rule._id, value);
  }

  showRule(rule: VTRule) {
    return rule.enabled;
  }

  isInDOM: boolean;
  isOpened: boolean;

  constructor(private feedbackService: VTFeedbackService, private dialog: MatDialog) { }

  get vtEnabled() {
    return this.feedbackService.isEnabled;
  }

  ngOnInit(): void {
    this.feedbackService.settingsOpened.subscribe(shouldBeOpen => {
      if (shouldBeOpen) this.open();
      else this.close();
    })
  }

  closeClicked() {
    this.feedbackService.settingsOpened.next(false);
  }

  toggleVTClicked() {
    if (this.feedbackService.isEnabled) {
      this.dialog.open(VtDisableDialogComponent, {
        data: {
          disable: false,
          temporary: true
        }
      }).afterClosed().subscribe(data => {
        if (data.disable) {
          console.log('after closed');
          this.feedbackService.disableVirtualTeacher(data.temporary);
        }
      })
    }
    else {
      this.feedbackService.enableVirtualTeacher(true);
    }
  }

  private open() {
    this.isInDOM = true;
    this.isOpened = true;
  }

  private close() {
    this.isOpened = false;
    window.setTimeout(() => this.isInDOM=false, 300);
  }


}
