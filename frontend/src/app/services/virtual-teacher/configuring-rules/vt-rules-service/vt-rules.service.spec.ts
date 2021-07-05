import { TestBed } from '@angular/core/testing';

import { VtRulesService } from './vt-rules.service';

describe('VtRulesService', () => {
  let service: VtRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VtRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
