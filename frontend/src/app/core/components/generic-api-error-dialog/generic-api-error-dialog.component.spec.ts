import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericApiErrorDialogComponent } from './generic-api-error-dialog.component';

describe('GenericApiErrorDialogComponent', () => {
  let component: GenericApiErrorDialogComponent;
  let fixture: ComponentFixture<GenericApiErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericApiErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericApiErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
