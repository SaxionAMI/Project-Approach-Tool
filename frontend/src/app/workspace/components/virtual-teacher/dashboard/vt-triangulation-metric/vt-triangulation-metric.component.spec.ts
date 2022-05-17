import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtTriangulationMetricComponent } from './vt-triangulation-metric.component';

describe('VtTriangulationMetricComponent', () => {
  let component: VtTriangulationMetricComponent;
  let fixture: ComponentFixture<VtTriangulationMetricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtTriangulationMetricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtTriangulationMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
