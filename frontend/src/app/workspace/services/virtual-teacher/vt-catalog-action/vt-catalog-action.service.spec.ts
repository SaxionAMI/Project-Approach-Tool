import { TestBed } from '@angular/core/testing';

import { VTCatalogActionService } from './vt-catalog-action.service';

describe('VTCatalogActionService', () => {
  let service: VTCatalogActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VTCatalogActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
