import { Component, ViewChild } from '@angular/core';
import { DynamicComponentAnchor } from '@app/shared/directives/dynamic-component-anchor/dynamic-component-anchor.directive';
import { VTConfigurableCatalogTab } from '@app/core/models/virtual-teacher/rules/vt-configurable-catalog-tab';
import { VTRuleAction } from '@app/core/models/virtual-teacher/rules/vt-rule-action';
import { VTRuleAttribute } from '@app/core/models/virtual-teacher/rules/vt-rule-attribute';
import { VtRuleActionComponentBase } from '../../vt-rule-action-selector/vt-rule-action-component-base';

@Component({
  selector: 'app-vt-rule-open-catalog-tab',
  templateUrl: './vt-rule-open-catalog-tab.component.html',
  styleUrls: ['./vt-rule-open-catalog-tab.component.css']
})
export class VtRuleOpenCatalogTabComponent extends VtRuleActionComponentBase {
  @ViewChild(DynamicComponentAnchor, {static: true})
  __viewRef: DynamicComponentAnchor;

  get viewRef(): DynamicComponentAnchor {
    return this.__viewRef;
  }

  makeAction(): VTRuleAction {
    return new VTRuleAction(this);
  }

  public configurableCatalogTabs: VTConfigurableCatalogTab[];

  ngOnInit() {
    super.ngOnInit();
    this.rulesService.getVtCatalogTabs().subscribe(x => {
      this.configurableCatalogTabs = x;
      this.onDataChanged();
    });
  }

  validate() {
    super.validate();

    this.__catalogTabValid = this.configurableCatalogTabs?.findIndex(x => x.type == this.catalogTab) >= 0 ?? false;
    this.__displayAsValid = this.displayAs.length > 0;

    this.isValid = this.isValid && this.catalogTabValid && this.displayAsValid;
  }

  get displayAs(): string {
    return this.attributes.find(x => x.key == 'display')?.value ?? ''
  }

  set displayAs(value) {
    VTRuleAttribute.setValue(this.attributes, 'display', value);
    this.__displayAsChanged = true;
    this.onDataChanged();
  }



  get catalogTab(): string {
    return this.attributes.find(x => x.key == 'catalogTab')?.value ?? ''
  }

  set catalogTab(value) {
    VTRuleAttribute.setValue(this.attributes, 'catalogTab', value);
    this.__catalogTabChanged = true;
    this.onDataChanged();
  }



  private __displayAsValid: boolean = false;
  get displayAsValid()  {
    return this.__displayAsValid;
  }

  private __catalogTabValid: boolean = false;
  get catalogTabValid()  {
    return this.__catalogTabValid;
  }



  private __displayAsChanged: boolean = false;
  get displayAsChanged()  {
    return this.__displayAsChanged;
  }

  private __catalogTabChanged: boolean = false;
  get catalogTabChanged()  {
    return this.__catalogTabChanged;
  }

}
