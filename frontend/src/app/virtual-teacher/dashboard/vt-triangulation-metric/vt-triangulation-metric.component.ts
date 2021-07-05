import { Component, Input, OnInit } from '@angular/core';
import { VTActionShowMetrics } from 'src/app/models/virtual-teacher/actions/vt-action-show-metrics';

@Component({
  selector: 'app-vt-triangulation-metric',
  templateUrl: './vt-triangulation-metric.component.html',
  styleUrls: ['./vt-triangulation-metric.component.css']
})
export class VtTriangulationMetricComponent implements OnInit {

  @Input() metric: VTActionShowMetrics;

  constructor() { }

  ngOnInit(): void {

  }

  get overviewCertaintyPercentage() {
    return this.metric.metrics.overview / (this.metric.metrics.overview + this.metric.metrics.certainty) * 100;
  }

  get fitExpertisePercentage() {
    return this.metric.metrics.fit / (this.metric.metrics.fit + this.metric.metrics.expertise) * 100;
  }
}
