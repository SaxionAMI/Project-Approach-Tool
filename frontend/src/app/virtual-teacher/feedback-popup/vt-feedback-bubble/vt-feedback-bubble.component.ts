import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { VTActionFeedbackBubble } from 'src/app/models/virtual-teacher/actions/vt-action-feedback-bubble';
import { VTFeedbackBubbleService } from 'src/app/services/virtual-teacher/vt-feedback-bubble/vt-feedback-bubble.service';
import { VTFeedbackService } from 'src/app/services/virtual-teacher/vt-feedback-service/vt-feedback.service';
import { VTFeedbackBubbleDialogComponent } from '../vt-feedback-bubble-dialog/vt-feedback-bubble-dialog.component';

@Component({
  selector: 'app-vt-feedback-bubble',
  templateUrl: './vt-feedback-bubble.component.html',
  styleUrls: ['./vt-feedback-bubble.component.css']
})
export class VTFeedbackBubbleComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private dialogRef: MatDialogRef<VTFeedbackBubbleDialogComponent>;

  constructor(private dialog: MatDialog, private feedbackBubbleService: VTFeedbackBubbleService, private feedbackService: VTFeedbackService) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.feedbackBubbleService.showFeedback.subscribe(x => this.showFeedback(x))
  }

  showFeedback(data: VTActionFeedbackBubble) {
    if (this.dialogRef != null) return;
    this.dialogRef = this.dialog.open(VTFeedbackBubbleDialogComponent, {
      data: {
        ruleId: data.ruleId,
        title: data.title,
        subtitle: data.subtitle,
        message: data.message,
        severity: data.severity,
        secondaryAction: data.secondaryAction
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      switch(result) {
        case VTFeedbackBubbleDialogComponent.RESULT_SECONDARY_ACTION: 
          data.secondaryAction.perform();
          break;
        case VTFeedbackBubbleDialogComponent.RESULT_DONT_SHOW_AGAIN:
          this.feedbackService.setRuleEnabled(data.ruleId, false);
          break;
        case VTFeedbackBubbleDialogComponent.RESULT_CLOSE:
        default:
          break;
      }
      this.dialogRef = null;
    });
  }
}
