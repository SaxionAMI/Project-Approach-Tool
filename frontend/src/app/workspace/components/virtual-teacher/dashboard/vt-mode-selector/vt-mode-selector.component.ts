import { Component, OnInit, Output } from '@angular/core';
import { VTFeedbackService } from 'src/app/workspace/services/virtual-teacher/vt-feedback-service/vt-feedback.service';

@Component({
  selector: 'app-vt-mode-selector',
  templateUrl: './vt-mode-selector.component.html',
  styleUrls: ['./vt-mode-selector.component.css']
})
export class VtModeSelectorComponent implements OnInit {
  private _actualMode: String = 'creating';
  private _selectedMode: String = 'creating';

  get isVtEnabled() {
    return this.feedbackService.isEnabled;
  }

  get selectedMode(): String {
    return this._selectedMode;
  };

  set selectedMode(value: String) {
    this._selectedMode = value;
  }

  get pending(): Boolean {
    return this._selectedMode != this._actualMode;
  }

  get actualMode(): String {
    return this._actualMode;
  }

  constructor(private feedbackService: VTFeedbackService) {
    feedbackService.on(VTFeedbackService.EVENT_SET_FEEDBACK_MODE, mode => this.setSelectedMode(mode));
  }

  ngOnInit(): void {
  }

  onModeSelected(mode: String) {
    if (this.selectedMode === mode) return;
    this.selectedMode = mode;
    this.feedbackService.setFeedbackMode(this.selectedMode);
  }

  private setSelectedMode(value) {
    this._actualMode = value;
    this._selectedMode = value;
  }
}
