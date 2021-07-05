import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtDisableDialogComponent } from './vt-disable-dialog.component';

describe('VtDisableDialogComponent', () => {
  let component: VtDisableDialogComponent;
  let fixture: ComponentFixture<VtDisableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtDisableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtDisableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
