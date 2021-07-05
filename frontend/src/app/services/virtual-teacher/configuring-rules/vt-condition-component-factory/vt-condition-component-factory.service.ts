import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { VTConfigurableCondition } from 'src/app/models/virtual-teacher/rules/vt-configurable-condition';
import { VTRuleCondition } from 'src/app/models/virtual-teacher/rules/vt-rule-condition';
import { VtRuleCountConditionComponent } from 'src/app/virtual-teacher/configuring-feedback-rules/conditions/vt-rule-count-condition/vt-rule-count-condition.component';
import { VtRuleCountMethodsInStrategyConditionComponent } from 'src/app/virtual-teacher/configuring-feedback-rules/conditions/vt-rule-count-methods-in-strategy-condition/vt-rule-count-methods-in-strategy-condition.component';
import { VtRuleMultiConditionComponent } from 'src/app/virtual-teacher/configuring-feedback-rules/conditions/vt-rule-multi-condition/vt-rule-multi-condition.component';
import { VtRuleParameterlessConditionComponent } from 'src/app/virtual-teacher/configuring-feedback-rules/conditions/vt-rule-parameterless-condition/vt-rule-parameterless-condition.component';
import { VtRuleConditionComponentBase } from 'src/app/virtual-teacher/configuring-feedback-rules/vt-rule-condition-selector/vt-rule-condition-selector-base';
import { VtRulesService } from '../vt-rules-service/vt-rules.service';

@Injectable({
  providedIn: 'root'
})
export class VtConditionComponentFactoryService {
  constructor(private componentFactory: ComponentFactoryResolver, private ruleService: VtRulesService, private injector: Injector) { }

  makeFilledComponent(condition: VTRuleCondition, viewRef: ViewContainerRef) : Observable<ComponentRef<VtRuleConditionComponentBase>> {
    return new Observable(subscribe => {
      this.getConfigurableType(condition.type).subscribe(typeSettings => {
        const componentType = this.getComponentType(typeSettings.archetype);
        const specializedType = this.getSpecializedType(componentType, condition.type);
        const factory = this.componentFactory.resolveComponentFactory(specializedType);
        const componentRef = viewRef.createComponent(factory);
        componentRef.instance.setValues(condition);
        subscribe.next(componentRef);
      });
    })
  }

  makeBlankComponent(conditionType: string, viewRef: ViewContainerRef) : Observable<ComponentRef<VtRuleConditionComponentBase>> {
    return new Observable(subscribe => {
      this.getConfigurableType(conditionType).subscribe(typeSettings => {
        const componentType = this.getComponentType(typeSettings.archetype);
        const specializedType = this.getSpecializedType(componentType, conditionType);
        const factory = this.componentFactory.resolveComponentFactory(specializedType);
        const componentRef = viewRef.createComponent(factory);
        componentRef.instance.setValues({
          type: typeSettings.type,
          display: typeSettings.display,
          description: typeSettings.description,
          attributes: [],
          condition1: null,
          condition2: null
        });
        subscribe.next(componentRef);
      });
    })
  }

  private getSpecializedType(archetype: Type<VtRuleConditionComponentBase>, identifier: string): Type<VtRuleConditionComponentBase> {
    if (archetype == VtRuleCountConditionComponent && identifier == 'VtCountMethodsInStrategyCondition') {
      return VtRuleCountMethodsInStrategyConditionComponent;
    }
    else return archetype;
  }

  private getComponentType(conditionType: string): Type<VtRuleConditionComponentBase> {
    switch(conditionType) {
        case 'count': return VtRuleCountConditionComponent;
        case 'parameterless': return VtRuleParameterlessConditionComponent;
        case 'multiCondition': return VtRuleMultiConditionComponent;
        default: return null;
    }  
  }

  private getConfigurableType(type: string): Observable<VTConfigurableCondition> {
    return new Observable(subscribe => {
      this.ruleService.getVtConditions().subscribe(configurableConditions => {
        const matchingCondition = configurableConditions?.find(x => x.type == type) ?? null;
        subscribe.next(matchingCondition);
      });
    });
  }
}
