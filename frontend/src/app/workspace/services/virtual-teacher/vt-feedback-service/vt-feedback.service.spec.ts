import { TestBed } from '@angular/core/testing';

import { VTFeedbackService } from './vt-feedback.service';

describe('VTFeedbackService', () => {
  let service: VTFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VTFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
