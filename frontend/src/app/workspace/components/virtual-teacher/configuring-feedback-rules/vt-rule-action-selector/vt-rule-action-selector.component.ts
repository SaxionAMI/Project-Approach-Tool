import { ComponentRef, EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DynamicComponentAnchor } from 'src/app/shared/directives/dynamic-component-anchor/dynamic-component-anchor.directive';
import { IValidatable } from 'src/app/core/models/validation/validatable';
import { VTConfigurableAction } from 'src/app/core/models/virtual-teacher/rules/vt-configurable-action';
import { VTRule } from 'src/app/core/models/virtual-teacher/rules/vt-rule';
import { VTRuleAction } from 'src/app/core/models/virtual-teacher/rules/vt-rule-action';
import { VtActionComponentFactoryService } from 'src/app/workspace/services/virtual-teacher/configuring-rules/vt-action-component-factory/vt-action-component-factory.service';
import { VtRulesService } from 'src/app/workspace/services/virtual-teacher/configuring-rules/vt-rules-service/vt-rules.service';
import { VtRuleActionComponentBase } from './vt-rule-action-component-base';

@Component({
  selector: 'app-vt-rule-action-selector',
  templateUrl: './vt-rule-action-selector.component.html',
  styleUrls: ['./vt-rule-action-selector.component.css']
})
export class VtRuleActionSelectorComponent implements OnInit, IValidatable<boolean> {
  constructor(private ruleService: VtRulesService, private componentFactory: VtActionComponentFactoryService) { }

  @Output()
  public onValidated: EventEmitter<boolean> = new EventEmitter();
  public isValid: boolean;

  // actionComponent: ComponentRef<VtRuleActionSelectorComponent>;

  @ViewChild(DynamicComponentAnchor, {static: true})
  public viewRef: DynamicComponentAnchor;

  @Input() set rule(value: VTRule) {
    this._rule = value;
    if (this._rule?.action ?? false) {
      this.setExistingAction(this._rule.action);
    }
  }

  makeAction() {
    return this.actionComponent?.instance.makeAction() ?? null;
  }

  private _rule: VTRule;
  get rule() {
    return this._rule;
  }

  private configurableActions: VTConfigurableAction[];
  get supportedActions(): VTConfigurableAction[] {
    return this.configurableActions?.filter(x => x.primary && x.selectable) ?? [];
  }

  private __actionComponent: ComponentRef<VtRuleActionComponentBase>;

  public get actionComponent(): ComponentRef<VtRuleActionComponentBase> {
    return this.__actionComponent;
  }
  public set actionComponent(value: ComponentRef<VtRuleActionComponentBase>) {
    if (this.__actionComponent) {
      this.deleteAction();
    }
    this.__actionComponent = value;
    this.subscribeToChildEvents(this.__actionComponent.instance);
  }

  private onDeleteSubscription: Subscription;
  private onValidatedSubscription: Subscription;

  ngOnInit(): void {
    this.ruleService.getVtActions().subscribe(x => {
      this.configurableActions = x
    });
  }

  private onDataChanged() {
    this.validate();
    this.onValidated.emit(this.isValid);
  }

  public validate() {
    this.isValid = this.actionComponent?.instance.isValid ?? false;
  }

  public setExistingAction(action: VTRuleAction) {
    this.componentFactory.makeFilledComponent(action, this.viewRef.viewContainerRef).subscribe(x => {
      this.actionComponent = x;
    })
  }

  public setNewAction(type: string) {
    this.componentFactory.makeBlankComponent(type, this.viewRef.viewContainerRef).subscribe(x => {
      this.actionComponent = x;
    })
  }

  private deleteAction() {
    if (!this.__actionComponent) return;
    this.unsubscribeFromChildEvents();
    this.__actionComponent.destroy();
    this.viewRef.viewContainerRef.clear();
    this.__actionComponent = null;
  }

  private subscribeToChildEvents(child: VtRuleActionComponentBase) {
    this.onDeleteSubscription = child.onDelete.subscribe(_ => this.deleteAction());
    this.onValidatedSubscription = child.onValidated.subscribe(_ => this.onDataChanged());
  }

  private unsubscribeFromChildEvents() {
    this.onDeleteSubscription.unsubscribe();
    this.onValidatedSubscription.unsubscribe();
  }
}
