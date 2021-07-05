import { Component, OnInit } from '@angular/core';
import { VTConfigurableCondition } from 'src/app/models/virtual-teacher/rules/vt-configurable-condition';
import { IVTRuleCondition, VTRuleCondition } from 'src/app/models/virtual-teacher/rules/vt-rule-condition';
import { VtRuleConditionComponentBase } from '../../vt-rule-condition-selector/vt-rule-condition-selector-base';

@Component({
  selector: 'app-vt-rule-parameterless-condition',
  templateUrl: './vt-rule-parameterless-condition.component.html',
  styleUrls: ['./vt-rule-parameterless-condition.component.css']
})
export class VtRuleParameterlessConditionComponent extends VtRuleConditionComponentBase implements OnInit {
  public setValues(condition: IVTRuleCondition) {
    this.type = condition.type;
    this.attributes = condition.attributes;
    this.onDataChanged();
  }

  public makeCondition(): VTRuleCondition {
    return new VTRuleCondition(this)
  }

  public get supportedConditions(): VTConfigurableCondition[] {
    return []; //component has no children
  }

  public get multiConditionTypes(): VTConfigurableCondition[] {
    return this.configurableConditions?.filter(x => x.archetype == 'multiCondition') ?? [];
  }
}
