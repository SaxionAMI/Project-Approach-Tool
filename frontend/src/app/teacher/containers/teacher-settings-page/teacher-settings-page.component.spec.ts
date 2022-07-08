import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSettingsPageComponent } from './teacher-settings-page.component';

describe('TeacherSettingsPageComponent', () => {
  let component: TeacherSettingsPageComponent;
  let fixture: ComponentFixture<TeacherSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
