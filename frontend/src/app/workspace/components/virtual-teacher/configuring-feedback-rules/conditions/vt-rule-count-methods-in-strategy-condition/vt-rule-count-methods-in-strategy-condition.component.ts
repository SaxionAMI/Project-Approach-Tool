import { Component, OnInit } from '@angular/core';
import { VTConfigurableStrategy } from 'src/app/core/models/virtual-teacher/rules/vt-configurable-strategy';
import { VTRuleAttribute } from 'src/app/core/models/virtual-teacher/rules/vt-rule-attribute';
import { VtRuleCountConditionComponent } from '../vt-rule-count-condition/vt-rule-count-condition.component';

@Component({
  selector: 'app-vt-rule-count-methods-in-strategy-condition',
  templateUrl: './vt-rule-count-methods-in-strategy-condition.component.html',
  styleUrls: ['./vt-rule-count-methods-in-strategy-condition.component.css']
})
export class VtRuleCountMethodsInStrategyConditionComponent extends VtRuleCountConditionComponent implements OnInit {

  private _supportedStrategies: VTConfigurableStrategy[];
  get supportedStrategies() {
    return this._supportedStrategies;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.ruleService.getVtStrategies().subscribe(x => {
      this._supportedStrategies = x;
      this.onDataChanged();
    });
  }

  validate() {
    super.validate();
    this._strategyValid = (this.supportedStrategies?.findIndex(x => x.identifier == this.strategy) >= 0) ?? false;
    this.isValid = this.isValid && this._strategyValid;
  }

  get strategy(): string {
    return this.attributes.find(x => x.key == 'strategy')?.value ?? '';
  }
  set strategy(value: string) {
    VTRuleAttribute.setValue(this.attributes, 'strategy', value)
    this.onDataChanged();
  }

  private _strategyChanged: boolean;
  get strategyChanged() {
    return this._strategyChanged;
  }

  private _strategyValid: boolean;
  get strategyValid() {
    return this._strategyValid;
  }
}
