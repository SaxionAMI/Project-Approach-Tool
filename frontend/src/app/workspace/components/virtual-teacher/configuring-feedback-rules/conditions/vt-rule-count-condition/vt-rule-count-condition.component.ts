import { Component, OnInit } from '@angular/core';
import { VTConfigurableComparison } from 'src/app/core/models/virtual-teacher/rules/vt-configurable-comparison';
import { VTConfigurableCondition } from 'src/app/core/models/virtual-teacher/rules/vt-configurable-condition';
import { VTConfigurableScope } from 'src/app/core/models/virtual-teacher/rules/vt-configurable-scope';
import { VTRuleAttribute } from 'src/app/core/models/virtual-teacher/rules/vt-rule-attribute';
import { IVTRuleCondition, VTRuleCondition } from 'src/app/core/models/virtual-teacher/rules/vt-rule-condition';
import { VtRuleConditionComponentBase } from '../../vt-rule-condition-selector/vt-rule-condition-selector-base';

@Component({
  selector: 'app-vt-rule-count-condition',
  templateUrl: './vt-rule-count-condition.component.html',
  styleUrls: ['./vt-rule-count-condition.component.css']
})
export class VtRuleCountConditionComponent extends VtRuleConditionComponentBase implements OnInit {
  minValue: number = 0;
  maxValue: number = 20;

  scopeValid: boolean;
  comparisonValid: boolean;
  valueValid: boolean;

  scopeChanged: boolean;
  comparisonChanged: boolean;
  valueChanged: boolean;

  validate() {
    super.validate();

    const parsedValue = parseInt(this.value);

    this.scopeValid = this.supportedScopes?.findIndex(x => x.type == this.scope) >= 0 ?? false;
    this.comparisonValid = this.supportedComparisons?.findIndex(x => x.type == this.comparison) >= 0 ?? false;
    this.valueValid = !isNaN(parsedValue) && parsedValue >= this.minValue && parsedValue <= this.maxValue;

    this.isValid = this.isValid &&this.scopeValid && this.comparisonValid && this.valueValid;
  }

  public get multiConditionTypes(): VTConfigurableCondition[] {
    return this.configurableConditions?.filter(x => x.archetype == 'multiCondition') ?? [];
  }

  supportedComparisons: VTConfigurableComparison[];
  supportedScopes: VTConfigurableScope[];

  ngOnInit() {
    super.ngOnInit();
    this.ruleService.getVtComparisons().subscribe(x => {
      this.supportedComparisons = x
      this.onDataChanged();
    });
    this.ruleService.getVtScopes().subscribe(x => {
      this.supportedScopes = x
      this.onDataChanged();
    });
  }

  public setValues(condition: IVTRuleCondition) {
    this.type = condition.type;
    this.attributes = condition.attributes;
    this.onDataChanged();
  }

  public makeCondition() {
    return new VTRuleCondition(this);
  }

  get supportedConditions(): VTConfigurableCondition[] {
    return [];
  }

  get scope() {
    return this.attributes.find(x => x.key == 'scope')?.value ?? '';
  }

  set scope(value: string) {
    if (this.scope === value) return;
    this.scopeChanged = true;
    VTRuleAttribute.setValue(this.attributes, 'scope', value);
    this.onDataChanged();
  }

  get comparison() {
    return this.attributes.find(x => x.key == 'comparison')?.value ?? '';
  }

  set comparison(value: string) {
    if (this.comparison === value) return;
    this.comparisonChanged = true;
    VTRuleAttribute.setValue(this.attributes, 'comparison', value);
    this.onDataChanged();
  }

  get value() {
    return this.attributes.find(x => x.key == 'value')?.value ?? '';
  }

  set value(value: string) {
    if (this.value === value) return;
    const parsed = parseInt(value, 10);
    if (isNaN(parsed))  {
      VTRuleAttribute.setValue(this.attributes, 'value', '');
    }
    else {
      VTRuleAttribute.setValue(this.attributes, 'value', value);
    }
    this.valueChanged = true;
    this.onDataChanged();
  }
}
