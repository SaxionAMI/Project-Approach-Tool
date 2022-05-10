import { TestBed } from '@angular/core/testing';

import { VtConditionComponentFactoryService } from './vt-condition-component-factory.service';

describe('VtConditionComponentFactoryService', () => {
  let service: VtConditionComponentFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VtConditionComponentFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
