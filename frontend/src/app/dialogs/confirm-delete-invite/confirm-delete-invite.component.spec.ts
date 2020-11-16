import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteInviteComponent } from './confirm-delete-invite.component';

describe('ConfirmDeleteInviteComponent', () => {
  let component: ConfirmDeleteInviteComponent;
  let fixture: ComponentFixture<ConfirmDeleteInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
