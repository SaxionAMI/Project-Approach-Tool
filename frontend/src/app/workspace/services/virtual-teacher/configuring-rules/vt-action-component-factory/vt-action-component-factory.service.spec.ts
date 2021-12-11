import { TestBed } from '@angular/core/testing';

import { VtActionComponentFactoryService } from './vt-action-component-factory.service';

describe('VtActionComponentFactoryService', () => {
  let service: VtActionComponentFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VtActionComponentFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
