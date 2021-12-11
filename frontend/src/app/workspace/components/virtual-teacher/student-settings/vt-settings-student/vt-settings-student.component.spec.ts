import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtSettingsStudentComponent } from './vt-settings-student.component';

describe('VtSettingsStudentComponent', () => {
  let component: VtSettingsStudentComponent;
  let fixture: ComponentFixture<VtSettingsStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtSettingsStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtSettingsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
