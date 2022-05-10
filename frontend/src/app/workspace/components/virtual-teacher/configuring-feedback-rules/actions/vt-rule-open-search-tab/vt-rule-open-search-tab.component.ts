import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicComponentAnchor } from 'src/app/shared/directives/dynamic-component-anchor/dynamic-component-anchor.directive';
import { VTRuleAction } from 'src/app/core/models/virtual-teacher/rules/vt-rule-action';
import { VTRuleAttribute } from 'src/app/core/models/virtual-teacher/rules/vt-rule-attribute';
import { VtRuleActionComponentBase } from '../../vt-rule-action-selector/vt-rule-action-component-base';

@Component({
  selector: 'app-vt-rule-open-search-tab',
  templateUrl: './vt-rule-open-search-tab.component.html',
  styleUrls: ['./vt-rule-open-search-tab.component.css']
})
export class VtRuleOpenSearchTabComponent extends VtRuleActionComponentBase {
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

    this.__searchPhraseValid = this.searchPhrase.length > 0;
    this.__displayAsValid = this.displayAs.length > 0;

    this.isValid = this.isValid && this.__searchPhraseValid && this.__displayAsValid;
  }

  get displayAs(): string {
    return this.attributes.find(x => x.key == 'display')?.value ?? ''
  }

  set displayAs(value) {
    VTRuleAttribute.setValue(this.attributes, 'display', value);
    this.__displayAsChanged = true;
    this.onDataChanged();
  }



  get searchPhrase(): string {
    return this.attributes.find(x => x.key == 'searchPhrase')?.value ?? ''
  }

  set searchPhrase(value) {
    VTRuleAttribute.setValue(this.attributes, 'searchPhrase', value);
    this.__searchPhraseChanged = true;
    this.onDataChanged();
  }



  private __displayAsValid: boolean = false;
  get displayAsValid()  {
    return this.__displayAsValid;
  }

  private __searchPhraseValid: boolean = false;
  get searchPhraseValid()  {
    return this.__searchPhraseValid;
  }



  private __displayAsChanged: boolean = false;
  get displayAsChanged()  {
    return this.__displayAsChanged;
  }

  private __searchPhraseChanged: boolean = false;
  get searchPhraseChanged()  {
    return this.__searchPhraseChanged;
  }
}
