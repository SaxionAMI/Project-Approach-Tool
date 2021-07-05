import { Component, Input, OnInit } from '@angular/core';
import { VTActionShowMetrics } from 'src/app/models/virtual-teacher/actions/vt-action-show-metrics';

@Component({
  selector: 'app-vt-strategy-metric',
  templateUrl: './vt-strategy-metric.component.html',
  styleUrls: ['./vt-strategy-metric.component.css']
})
export class VtStrategyMetricComponent implements OnInit {

  @Input() metric: VTActionShowMetrics;

  constructor() { }

  ngOnInit(): void {

  }

  private getTotal() {
    return  this.metric.metrics.field +
            this.metric.metrics.library +
            this.metric.metrics.workshop +
            this.metric.metrics.lab +
            this.metric.metrics.showroom;
  }

  get fieldPercentage() {
    return Math.round(this.metric.metrics.field / this.getTotal() * 100);
  }

  get libraryPercentage() {
    return Math.round(this.metric.metrics.library / this.getTotal() * 100);
  }

  get workshopPercentage() {
    return Math.round(this.metric.metrics.workshop / this.getTotal() * 100);
  }

  get labPercentage() {
    return Math.round(this.metric.metrics.lab / this.getTotal() * 100);
  }

  get showroomPercentage() {
    return Math.round(this.metric.metrics.showroom / this.getTotal() * 100);
  }
}
