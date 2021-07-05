import { EventEmitter, Injectable, Output } from '@angular/core';
import { VTActionOpenCatalog } from '../../../models/virtual-teacher/actions/secondary/vt-action-open-catalog';
import { VTActionOpenSearch } from '../../../models/virtual-teacher/actions/secondary/vt-action-open-search';

@Injectable({
  providedIn: 'root'
})
export class VTCatalogActionService {

  constructor() { }

  @Output() openCatalogTab: EventEmitter<VTActionOpenCatalog> = new EventEmitter<VTActionOpenCatalog>();
  @Output() openSearchTab: EventEmitter<VTActionOpenSearch> = new EventEmitter<VTActionOpenSearch>();
}
