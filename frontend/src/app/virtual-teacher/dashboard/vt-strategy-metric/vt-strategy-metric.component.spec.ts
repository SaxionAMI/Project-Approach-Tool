import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtStrategyMetricComponent } from './vt-strategy-metric.component';

describe('VtStrategyMetricComponent', () => {
  let component: VtStrategyMetricComponent;
  let fixture: ComponentFixture<VtStrategyMetricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtStrategyMetricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtStrategyMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
