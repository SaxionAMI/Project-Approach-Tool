import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRulesListDeleteDialogComponent } from './vt-rules-list-delete-dialog.component';

describe('VtRulesListDeleteDialogComponent', () => {
  let component: VtRulesListDeleteDialogComponent;
  let fixture: ComponentFixture<VtRulesListDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRulesListDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRulesListDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
