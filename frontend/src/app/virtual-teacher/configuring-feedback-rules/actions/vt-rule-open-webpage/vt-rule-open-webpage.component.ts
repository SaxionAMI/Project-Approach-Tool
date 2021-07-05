import { Component, ViewChild } from '@angular/core';
import { DynamicComponentAnchor } from 'src/app/directives/dynamic-component-anchor/dynamic-component-anchor.directive';
import { VTRuleAction } from 'src/app/models/virtual-teacher/rules/vt-rule-action';
import { VTRuleAttribute } from 'src/app/models/virtual-teacher/rules/vt-rule-attribute';
import { VtRuleActionComponentBase } from '../../vt-rule-action-selector/vt-rule-action-component-base';

@Component({
  selector: 'app-vt-rule-open-webpage',
  templateUrl: './vt-rule-open-webpage.component.html',
  styleUrls: ['./vt-rule-open-webpage.component.css']
})
export class VtRuleOpenWebpageComponent extends VtRuleActionComponentBase {
  @ViewChild(DynamicComponentAnchor, {static: true})
  __viewRef: DynamicComponentAnchor;

  get viewRef(): DynamicComponentAnchor {
    return this.__viewRef;
  }  

  makeAction(): VTRuleAction {
    return new VTRuleAction(this);
  }

  validate() {
    super.validate();

    this.__urlValid = this.url.length > 0;
    this.__displayAsValid = this.displayAs.length > 0;

    this.isValid = this.isValid && this.urlValid && this.displayAsValid;
  }

  get displayAs(): string {
    return this.attributes.find(x => x.key == 'display')?.value ?? ''
  }

  set displayAs(value) {
    VTRuleAttribute.setValue(this.attributes, 'display', value);
    this.__displayAsChanged = true;
    this.onDataChanged();
  }



  get url(): string {
    return this.attributes.find(x => x.key == 'url')?.value ?? ''
  }

  set url(value) {
    VTRuleAttribute.setValue(this.attributes, 'url', value);
    this.__urlChanged = true;
    this.onDataChanged();
  }

  
  
  private __displayAsValid: boolean = false;
  get displayAsValid()  {
    return this.__displayAsValid;
  }

  private __urlValid: boolean = false;
  get urlValid()  {
    return this.__urlValid;
  }



  private __displayAsChanged: boolean = false;
  get displayAsChanged()  {
    return this.__displayAsChanged;
  }

  private __urlChanged: boolean = false;
  get urlChanged()  {
    return this.__urlChanged;
  }

}
