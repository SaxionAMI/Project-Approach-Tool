import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { VTFeedbackService } from 'src/app/services/virtual-teacher/vt-feedback-service/vt-feedback.service';
import { VTPrimaryAction } from '../../../models/virtual-teacher/actions/vt-primary-action';
import { Workspace } from '../../../models/workspace.model';
import { VtSettingsStudentComponent } from '../../student-settings/vt-settings-student/vt-settings-student.component';

@Component({
  selector: 'app-vt-dashboard',
  templateUrl: './vt-dashboard.component.html',
  styleUrls: ['./vt-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VtDashboardComponent implements OnInit {
  private _room: string = undefined;
  private _workspace: Workspace = undefined;
  mode: String;
  showMetrics: boolean = false;
  metricsCollection: any[] = [];

  get room(): string {
    return this._room;
  }

  @ViewChild('settingsPanel') settingsPanel: VtSettingsStudentComponent;

  @Input()
  set room(value: string) {
    this._room = value;
    if (value && this._workspace) {
      this.feedbackService.start(value, this._workspace);
    }
  }

  get workspace(): Workspace {
    return this._workspace;
  }

  @Input() set workspace(value) {
    this._workspace = value;
    if (value && this._room) {
      this.feedbackService.start(this._room, value);
    }
  }

  constructor(private feedbackService: VTFeedbackService){}

  ngOnInit(): void {
    this.feedbackService.start(this._room, this.workspace);
  }

  onFeedbackClicked(feedbacks: VTPrimaryAction[]) {
    if (feedbacks.length > 0) {
      feedbacks[0].perform();
    }
  }

  onMetricsClicked() {
    if (this.showMetrics) {
      this.showMetrics = false;
      this.metricsCollection = [];
    }
    else {
      this.metricsCollection = this.workspace.feedback.metrics;
      this.showMetrics = true;
    }
  }

  onSettingsClicked() {
    if (this.feedbackService.settingsOpened.getValue()) {
      this.feedbackService.settingsOpened.next(false);
    }
    else {
      this.feedbackService.settingsOpened.next(true);
    }
  }
}
