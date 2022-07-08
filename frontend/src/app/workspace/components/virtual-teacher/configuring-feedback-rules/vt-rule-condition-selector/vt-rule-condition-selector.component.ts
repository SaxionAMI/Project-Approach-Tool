import { Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DynamicComponentAnchor } from 'src/app/shared/directives/dynamic-component-anchor/dynamic-component-anchor.directive';
import { IValidatable } from 'src/app/core/models/validation/validatable';
import { VTConfigurableCondition } from 'src/app/core/models/virtual-teacher/rules/vt-configurable-condition';
import { VTRule } from 'src/app/core/models/virtual-teacher/rules/vt-rule';
import { VTRuleCondition } from 'src/app/core/models/virtual-teacher/rules/vt-rule-condition';
import { VtConditionComponentFactoryService } from 'src/app/workspace/services/virtual-teacher/configuring-rules/vt-condition-component-factory/vt-condition-component-factory.service';
import { VtRulesService } from 'src/app/workspace/services/virtual-teacher/configuring-rules/vt-rules-service/vt-rules.service';
import { VtRuleMultiConditionComponent } from '../conditions/vt-rule-multi-condition/vt-rule-multi-condition.component';
import { IConditionComponentParent, UnwrapEventArgs, VtRuleConditionComponentBase, WrapEventArgs } from './vt-rule-condition-selector-base';

@Component({
  selector: 'app-vt-rule-condition-selector',
  templateUrl: './vt-rule-condition-selector.component.html',
  styleUrls: ['./vt-rule-condition-selector.component.css']
})
export class VtRuleConditionSelectorComponent implements OnInit, IConditionComponentParent, IValidatable<boolean>  {
  @Input() rule: VTRule;

  @Output() onValidated: EventEmitter<boolean> = new EventEmitter();

  isValid: boolean;

  type: string = VtRuleConditionComponentBase.componentParent;

  conditionComponent: ComponentRef<VtRuleConditionComponentBase>;

  private onDeleteSubscription: Subscription;
  private onWrapSubscription: Subscription;
  private onUnwrapSubscription: Subscription;
  private onValidatedSubscription: Subscription;

  constructor(private rulesService: VtRulesService, private componentFactory: VtConditionComponentFactoryService) {}

  validate() {
    this.isValid = this.conditionComponent?.instance.isValid ?? false;
  }

  //Anchor component where the dynamic condition component
  //will be injected into the UI.
  @ViewChild(DynamicComponentAnchor, {static: true})
  conditionDirective: DynamicComponentAnchor;

  supportedConditions: VTConfigurableCondition[];

  makeCondition(): VTRuleCondition {
    return this.conditionComponent?.instance.makeCondition() ?? null;
  }

  onDataChanged() {
    this.validate();
    this.onValidated.emit(this.isValid);
  }

  adoptChild(child: ComponentRef<VtRuleConditionComponentBase>) {
    return; //function will never be called since `this` will never have a parent of type IConditionComponentParent.
  }

  ngOnDestroy(): void {
    this.unsubscribeFromChildEvents();
  }

  ngOnInit(): void {
    this.rulesService.getVtConditions().subscribe(x => this.supportedConditions = x.filter(y => y.selectable));

    this.componentFactory.makeFilledComponent(this.rule.condition, this.conditionDirective.viewContainerRef).subscribe(x => {
      this.conditionComponent = x;
      this.subscribeToChildEvents(this.conditionComponent.instance);
    });
  }

  /**
   * Destroy the current condition component and all its children.
   * @param component The component to destroy.
   */
  deleteChild(component: VtRuleConditionComponentBase) {
    this.conditionComponent = null;
    this.conditionDirective.viewContainerRef.clear();
    this.onDataChanged();
  }

  /**
   * Add a new, blank condition component of the given type.
   * @param type The type of condition component to create.
   */
  addChild(type: string) {
    if (this.conditionComponent != null) return;
    this.componentFactory.makeBlankComponent(type, this.conditionDirective.viewContainerRef).subscribe(x => {
      this.conditionComponent = x;
      this.subscribeToChildEvents(this.conditionComponent.instance);
    })
    this.onDataChanged();
  }

  /**
   * Subscribe to all operation events of the given child. These are used to wrap, unwrap and delete the child later.
   * @param child The child to subscribe to.
   */
  subscribeToChildEvents(child: VtRuleConditionComponentBase) {
    this.onDeleteSubscription = child.onDelete.subscribe(x => this.deleteChild(x));
    this.onWrapSubscription = child.onWrap.subscribe((x: WrapEventArgs) => this.wrapChild(x.component, x.type));
    this.onUnwrapSubscription = child.onUnwrap.subscribe((x: UnwrapEventArgs) => this.unwrapChild(x.viewRef, x.currentParent));
    this.onValidatedSubscription = child.onValidated.subscribe(() => this.onDataChanged());
  }

  /**
   * Unsubscribe from all currently subscribed operation events. This is done upon destroying the current child.
   */
  unsubscribeFromChildEvents() {
    this.onDeleteSubscription?.unsubscribe();
    this.onWrapSubscription?.unsubscribe();
    this.onUnwrapSubscription?.unsubscribe();
    this.onValidatedSubscription?.unsubscribe();
  }

  /**
   * Wrap the given child component. To explain:
   * - `this` is the direct parent of `child`.
   * - By wrapping, `child` is assigned a new `parent`.
   * - By wrapping, `parent` becomes the new direct child of `this`.
   *
   * So basically, wrapping turns a child into a grandchild by inserting a new `parent` in between.
   * @param child The child to wrap.
   * @param type The type of parent component to create.
   */
  wrapChild(child: VtRuleConditionComponentBase, type: string) {
    if (child == this.conditionComponent.instance) {
      const childRef = this.conditionComponent;
      this.unsubscribeFromChildEvents();
      this.conditionDirective.viewContainerRef.detach();
      this.componentFactory.makeBlankComponent(type, this.conditionDirective.viewContainerRef).subscribe(x => {
        if (!x.instance.canHaveChildren) {
          console.log('instance cant have children')
          return;
        }
        this.conditionComponent = x;
        x.instance.asComponentParent.adoptChild(childRef);
        this.subscribeToChildEvents(this.conditionComponent.instance);
      })
    }
    this.onDataChanged();
  }

  /**
   * Unwrap the given `child` from the given `currentParent`. To explain:
   * - `this` is the grandparent of `child`.
   * - `child` is a direct child of `currentParent`.
   * - `currentParent` is the direct child of `this`.
   * - By unwrapping, `child` becomes the direct child of `this`.
   * - By unwrapping, `currentParent` and its other child are destroyed.
   *
   * So basically, unwrapping converts a grandchild to a child by destroying the parent component in between.
   * @param child The child component to unwrap.
   * @param currentParent The current parent component of child.
   */
  unwrapChild(child: ComponentRef<VtRuleConditionComponentBase>, currentParent: VtRuleMultiConditionComponent) {
    if (this.conditionComponent.instance instanceof VtRuleMultiConditionComponent &&
        this.conditionComponent.instance == currentParent) {

      if (!this.conditionComponent.instance.canHaveChildren) return;
      //Destroy current child
      this.unsubscribeFromChildEvents();
      this.conditionComponent.instance.asComponentParent.unsubscribeFromChildEvents();
      this.deleteChild(this.conditionComponent.instance);

      //Adopt the grandchild component as a direct child component.
      this.conditionComponent = child;
      this.conditionDirective.viewContainerRef.insert(child.hostView);
      this.subscribeToChildEvents(this.conditionComponent.instance);
    }
    this.onDataChanged();
  }
}

