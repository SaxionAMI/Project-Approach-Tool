import { TestBed } from '@angular/core/testing';

import { VTFeedbackBubbleService } from './vt-feedback-bubble.service';

describe('VTFeedbackBubbleService', () => {
  let service: VTFeedbackBubbleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VTFeedbackBubbleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
