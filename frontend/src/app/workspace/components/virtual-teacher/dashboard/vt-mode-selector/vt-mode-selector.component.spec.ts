import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtModeSelectorComponent } from './vt-mode-selector.component';

describe('VtModeSelectorComponent', () => {
  let component: VtModeSelectorComponent;
  let fixture: ComponentFixture<VtModeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtModeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
