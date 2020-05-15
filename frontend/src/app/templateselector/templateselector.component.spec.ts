import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateselectorComponent } from './templateselector.component';

describe('TemplateselectorComponent', () => {
  let component: TemplateselectorComponent;
  let fixture: ComponentFixture<TemplateselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
