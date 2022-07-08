import { ComponentRef, Type } from '@angular/core';
import { ComponentFactoryResolver, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { VTRuleAction } from 'src/app/core/models/virtual-teacher/rules/vt-rule-action';
import { VtRuleActionComponentBase } from 'src/app/workspace/components/virtual-teacher/configuring-feedback-rules/vt-rule-action-selector/vt-rule-action-component-base';
import { VtRuleFeedbackBubbleActionComponent } from 'src/app/workspace/components/virtual-teacher/configuring-feedback-rules/actions/vt-rule-feedback-bubble-action/vt-rule-feedback-bubble-action.component';
import { VtRuleOpenCatalogTabComponent } from 'src/app/workspace/components/virtual-teacher/configuring-feedback-rules/actions/vt-rule-open-catalog-tab/vt-rule-open-catalog-tab.component';
import { VtRuleOpenWebpageComponent } from 'src/app/workspace/components/virtual-teacher/configuring-feedback-rules/actions/vt-rule-open-webpage/vt-rule-open-webpage.component';
import { VtRulesService } from '../vt-rules-service/vt-rules.service';
import { VtRuleOpenSearchTabComponent } from 'src/app/workspace/components/virtual-teacher/configuring-feedback-rules/actions/vt-rule-open-search-tab/vt-rule-open-search-tab.component';

@Injectable({
  providedIn: 'root'
})
export class VtActionComponentFactoryService {

  constructor(private componentFactory: ComponentFactoryResolver, private ruleService: VtRulesService, private injector: Injector) { }

  makeFilledComponent(action: VTRuleAction, viewRef: ViewContainerRef): Observable<ComponentRef<VtRuleActionComponentBase>> {
    return new Observable(subscribe => {
      console.log(action.type);
      const componentType = this.getComponentType(action.type);
      if (!componentType) subscribe.next(null);

      const factory = this.componentFactory.resolveComponentFactory(componentType);
      const componentRef = viewRef.createComponent(factory);
      componentRef.instance.setValues(action);
      subscribe.next(componentRef);
    });
  }

  makeBlankComponent(type: string, viewRef: ViewContainerRef): Observable<ComponentRef<VtRuleActionComponentBase>> {
    return new Observable(subscribe => {
      this.ruleService.getVtActions().subscribe(x => {
        const matchingAction = x.find(y => y.type == type);
        if (!matchingAction) {
          subscribe.next(null);
          return;
        }

        const componentType = this.getComponentType(type);
        if (!componentType) subscribe.next(null);

        const factory = this.componentFactory.resolveComponentFactory(componentType);
        const componentRef = viewRef.createComponent(factory);
        componentRef.instance.setValues({
          type: matchingAction.type,
          display: matchingAction.display,
          attributes: [],
          secondaryAction: null
        });
        subscribe.next(componentRef);
      })
    });
  }

  private getComponentType(conditionType: string): Type<VtRuleActionComponentBase> {
    switch(conditionType) {
        case 'VTRuleActionShowFeedbackBubble': return VtRuleFeedbackBubbleActionComponent;
        case 'VTOpenWebsiteAction': return VtRuleOpenWebpageComponent;
        case 'VTOpenCatalogAction': return VtRuleOpenCatalogTabComponent;
        case 'VTOpenSearchAction': return VtRuleOpenSearchTabComponent;
        default: return null;
    }
  }
}
