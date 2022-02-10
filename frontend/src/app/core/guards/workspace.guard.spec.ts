import { TestBed } from '@angular/core/testing';

import { WorkspaceGuard } from './workspace.guard';

describe('WorkspaceGuard', () => {
  let guard: WorkspaceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WorkspaceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
