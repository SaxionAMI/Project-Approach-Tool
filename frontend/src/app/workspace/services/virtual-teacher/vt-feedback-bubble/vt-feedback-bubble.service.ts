import { EventEmitter, Injectable, Output } from '@angular/core';
import { VTActionFeedbackBubble } from 'src/app/core/models/virtual-teacher/actions/vt-action-feedback-bubble';

@Injectable({
  providedIn: 'root'
})
export class VTFeedbackBubbleService {

  constructor() { }

  @Output() showFeedback: EventEmitter<VTActionFeedbackBubble> = new EventEmitter<VTActionFeedbackBubble>();
}
