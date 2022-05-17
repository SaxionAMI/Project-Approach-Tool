import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vt-feedback-bubble-dialog',
  templateUrl: './vt-feedback-bubble-dialog.component.html',
  styleUrls: ['./vt-feedback-bubble-dialog.component.css']
})
export class VTFeedbackBubbleDialogComponent implements OnInit {

  static RESULT_DONT_SHOW_AGAIN: number = 0;
  static RESULT_CLOSE: number = 1;
  static RESULT_SECONDARY_ACTION: number = 2;

  ruleId: string;
  title: string;
  subtitle: string;
  message: string;
  severity: string;
  secondaryAction: any;

  get result_dont_show_again() {
    return VTFeedbackBubbleDialogComponent.RESULT_DONT_SHOW_AGAIN
  }

  get result_close() {
    return VTFeedbackBubbleDialogComponent.RESULT_CLOSE
  }

  get result_secondary_action() {
    return VTFeedbackBubbleDialogComponent.RESULT_SECONDARY_ACTION
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.ruleId = data.ruleId;
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.message = data.message;
    this.severity = data.severity;
    this.secondaryAction = data.secondaryAction;
  }

  ngOnInit(): void {
  }
}
