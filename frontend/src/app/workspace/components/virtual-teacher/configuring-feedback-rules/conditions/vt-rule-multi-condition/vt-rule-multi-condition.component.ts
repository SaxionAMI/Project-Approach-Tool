import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { DynamicComponentAnchor } from 'src/app/shared/directives/dynamic-component-anchor/dynamic-component-anchor.directive';
import { VTConfigurableCondition } from 'src/app/core/models/virtual-teacher/rules/vt-configurable-condition';
import { IVTRuleCondition, VTRuleCondition } from 'src/app/core/models/virtual-teacher/rules/vt-rule-condition';
import { VtConditionComponentFactoryService } from 'src/app/workspace/services/virtual-teacher/configuring-rules/vt-condition-component-factory/vt-condition-component-factory.service';
import { VtRulesService } from 'src/app/workspace/services/virtual-teacher/configuring-rules/vt-rules-service/vt-rules.service';
import { IConditionComponentParent, UnwrapEventArgs, VtRuleConditionComponentBase, WrapEventArgs } from '../../vt-rule-condition-selector/vt-rule-condition-selector-base';

@Component({
  selector: 'app-vt-rule-multi-condition',
  templateUrl: './vt-rule-multi-condition.component.html',
  styleUrls: ['./vt-rule-multi-condition.component.css']
})
export class VtRuleMultiConditionComponent extends VtRuleConditionComponentBase implements OnInit, AfterViewInit, IConditionComponentParent {
  validate() {
    super.validate();

    this.chainTypeValid = this.multiConditionTypes?.findIndex(x => x.type == this.type) >= 0 ?? false;
    this.isValid =
      this.isValid &&
      this.chainTypeValid &&
      (this.conditionComponent1?.instance.isValid ?? false) &&
      (this.conditionComponent2?.instance.isValid ?? false);
  }

  public chainTypeValid: boolean;
  public chainTypeChanged: boolean;

  public type: string = VtRuleConditionComponentBase.componentParent;
  public conditionComponent1: ComponentRef<VtRuleConditionComponentBase>;
  public conditionComponent2: ComponentRef<VtRuleConditionComponentBase>;
  private childToAdopt: ComponentRef<VtRuleConditionComponentBase>;

  private onDeleteSubscription: Subscription;
  private onWrapSubscription: Subscription;
  private onUnwrapSubscription: Subscription;
  private onValidatedSubscription: Subscription;

  private conditionToAdd1: VTRuleCondition;
  private conditionToAdd2: VTRuleCondition;

  /**
   * Get the type of multi condition. This determines how both child conditions are 'chained' - i.e. evaluated against each other.
   */
  get chainType(): VTConfigurableCondition {
    return this.configurableConditions?.find(x => x.type == this.type) ?? null;
  }

  /**
   * Set the type of multi condition. This determines how both child conditions are 'chained' - i.e. evaluated against each other.
   */
  set chainType(value: VTConfigurableCondition) {
    if (this.type === value.type) return;
    this.type = value.type;
    this.chainTypeChanged = true;
  }

  @ViewChildren(DynamicComponentAnchor) conditionDirectives: QueryList<DynamicComponentAnchor>;

  constructor(componentFactory: VtConditionComponentFactoryService, ruleService: VtRulesService, private changeDetector: ChangeDetectorRef) {
    super(ruleService, componentFactory);
  }

  subscribeToChildEvents(child: VtRuleConditionComponentBase) {
    this.onDeleteSubscription = child.onDelete.subscribe(x => this.deleteChild(x));
    this.onWrapSubscription = child.onWrap.subscribe((x: WrapEventArgs) => this.wrapChild(x.component, x.type));
    this.onUnwrapSubscription = child.onUnwrap.subscribe((x: UnwrapEventArgs) => this.onUnwrapChild(x));
    this.onValidatedSubscription = child.onValidated.subscribe(() => this.onDataChanged());
  }

  unsubscribeFromChildEvents() {
    this.onDeleteSubscription?.unsubscribe();
    this.onWrapSubscription?.unsubscribe();
    this.onUnwrapSubscription?.unsubscribe();
    this.onValidatedSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromChildEvents();
  }

  ngAfterViewInit(): void {
    if (this.childToAdopt) {
      setTimeout(() => {
        this.adoptChild(this.childToAdopt);
        this.changeDetector.detectChanges();
      }, 100);
    }
    else {
      if (this.conditionToAdd1) {
        this.componentFactory.makeFilledComponent(this.conditionToAdd1, this.viewRef1.viewContainerRef).subscribe(x => {
          this.conditionComponent1 = x;
          this.subscribeToChildEvents(this.conditionComponent1.instance);
        });
      }
      if (this.conditionToAdd2) {
        this.componentFactory.makeFilledComponent(this.conditionToAdd2, this.viewRef2.viewContainerRef).subscribe(x => {
          this.conditionComponent2 = x;
          this.subscribeToChildEvents(this.conditionComponent2.instance);
        });
      }
    }
  }

  /**
   * Wrap a child component by placing a new parent condition between `this` and `child`. To explain:
   * - `this` is the direct parent of `child`.
   * - By wrapping, `child` is assigned a new `parent`.
   * - By wrapping, the new `parent` of `child` becomes the new direct child of `this`.
   *
   * So basically, wrapping turns a child into a grandchild by inserting a new `parent` condition in between.
   * @param child The `child` to wrap.
   * @param type The type of parent component to insert in between.
   */
  public wrapChild(child: VtRuleConditionComponentBase, type: string) {
    if (this.conditionComponent1 && this.conditionComponent1.instance == child) {
      const viewRef = this.conditionComponent1;
      this.viewRef1.viewContainerRef.detach();
      this.componentFactory.makeBlankComponent(type, this.viewRef1.viewContainerRef).subscribe(x => {
        if (!x.instance.canHaveChildren) return;
        this.unsubscribeFromChildEvents();
        x.instance.asComponentParent.adoptChild(viewRef);
        this.conditionComponent1 = x;
        this.subscribeToChildEvents(this.conditionComponent1.instance);
      })
    }
    else if (this.conditionComponent2 && this.conditionComponent2.instance == child) {
      const viewRef = this.conditionComponent2;
      this.viewRef2.viewContainerRef.detach();
      this.componentFactory.makeBlankComponent(type, this.viewRef2.viewContainerRef).subscribe(x => {
        this.unsubscribeFromChildEvents();
        x.instance.asComponentParent.adoptChild(viewRef);
        this.conditionComponent1 = x;
        this.subscribeToChildEvents(this.conditionComponent2.instance);
      })
    }
    this.onDataChanged();
  }

  /**
   * Adopt the given child component. This is used during the wrapping process.
   * @param child The child component to adopt.
   */
  public adoptChild(child: ComponentRef<VtRuleConditionComponentBase>) {
    if (!this.viewRef1 || !this.viewRef2) {
      this.childToAdopt = child;
    }
    else {
      if (this.conditionComponent1 == null) {
        this.conditionComponent1 = child;
        this.viewRef1.viewContainerRef.insert(child.hostView, 0);
        this.subscribeToChildEvents(this.conditionComponent1.instance);
      }
      else if (this.conditionComponent2 == null) {
        this.conditionComponent2 = child;
        this.viewRef2.viewContainerRef.insert(child.hostView, 0);
        this.subscribeToChildEvents(this.conditionComponent2.instance);
      }
      this.childToAdopt = null;
    }
    this.onDataChanged();
  }

  /**
   * Unwrap the given child component from the given parent. To explain:
   * - `this` is the current grandparent of `child`.
   * - `child` is a direct child of `currentParent`.
   * - `currentParent` is a direct child of `this`.
   * - By unwrapping, `child` becomes a direct child of `this`.
   * - By unwrapping, `currentParent` and its other child (if any) is destroyed.
   *
   * So basically, unwrap converts a grandchild into a child by removing the `currentParent` condition in between them.
   *
   * @param child The child condition to unwrap.
   * @param currentParent The current parent of `child`.
   */
  public unwrapChild(child: ComponentRef<VtRuleConditionComponentBase>, currentParent: VtRuleMultiConditionComponent) {
    this.deleteChild(currentParent);
    if (this.conditionComponent1 == null) {
      this.unsubscribeFromChildEvents();
      this.conditionComponent1 = child;
      this.viewRef1.viewContainerRef.insert(child.hostView);
      this.subscribeToChildEvents(child.instance);
    }
    else {
      this.unsubscribeFromChildEvents();
      this.conditionComponent2 = child;
      this.viewRef2.viewContainerRef.insert(child.hostView);
      this.subscribeToChildEvents(child.instance);
    }
    this.onDataChanged();
  }

  /**
   * Destroy the given child component.
   */
  public deleteChild(child: VtRuleConditionComponentBase) {
    if (this.conditionComponent1 && child == this.conditionComponent1.instance)  {
      this.conditionComponent1 = null;
      this.viewRef1.viewContainerRef.clear();
    }
    else if (this.conditionComponent2 && child == this.conditionComponent2.instance)  {
      this.conditionComponent2 = null;
      this.viewRef2.viewContainerRef.clear();
    }
    this.onDataChanged();
  }

  /**
   * Convert this component to a VT Rule Condition model. This is used for saving.
   */
  public makeCondition(): VTRuleCondition {
    this.condition1 = this.conditionComponent1?.instance.makeCondition() ?? null;
    this.condition2 = this.conditionComponent2?.instance.makeCondition() ?? null;
    this.type = this.chainType.type;
    return new VTRuleCondition(this);
  }

  /**
   * Get a collection of all supported condition types.
   */
  public get supportedConditions(): VTConfigurableCondition[] {
    return this.configurableConditions?.filter(x => x.supportsMultiCondition && x.selectable) ?? [];
  }

  /**
   * Get a collection of all supported "multi condition" types.
   */
  public get multiConditionTypes(): VTConfigurableCondition[] {
    return this.configurableConditions?.filter(x => x.archetype == 'multiCondition') ?? [];
  }

  /**
   * Add a new, blank child component of the given type.
   * @param conditionType The type of child component to add.
   */
  public addChild(conditionType: string): void {
    if (this.conditionComponent1 == null) {
      this.componentFactory.makeBlankComponent(conditionType, this.viewRef1.viewContainerRef).subscribe(x => {
        this.conditionComponent1 = x;
        this.subscribeToChildEvents(this.conditionComponent1.instance);
      });
    }
    else if (this.conditionComponent2 == null) {
      this.componentFactory.makeBlankComponent(conditionType, this.viewRef2.viewContainerRef).subscribe(x => {
        this.conditionComponent2 = x;
        this.subscribeToChildEvents(this.conditionComponent2.instance);
      });
    }
    else {
      return; //no room for a third condition.
    }
    this.onDataChanged();
  }

  /**
   * Copy the given values. This is used upon opening an existing rule to
   * instantiate a component structure that represents the existing rule condition tree.
   * @param condition The condition subtree to copy.
   */
  public setValues(condition: IVTRuleCondition) {
    this.type = condition.type;
    this.attributes = condition.attributes;

    this.conditionToAdd1 = condition.condition1;
    this.conditionToAdd2 = condition.condition2;

    this.onDataChanged();
  }

  /**
   * Check if this component is eligible to unwrap the given child component.
   * @param x Unwrap event args containing all required parameters.
   */
  protected onUnwrapChild(x: UnwrapEventArgs) {
    if (x.currentParent && x.currentParent != this) {
      //'This' is the grandparent of the given child.
      //By unwrapping, the grandchild becomes the new
      //child of 'this' and its current parent is destroyed.
      this.unwrapChild(x.viewRef, x.currentParent);
    }
    else {
      //Not eligible --- `this`` is the direct parent of the child.
      //instead, gather viewref and instruct `this`s parent to
      //unwrap the child and destroy this in the process.
      x.currentParent = this;
      if (this.conditionComponent1.instance == x.component) {
        this.viewRef1.viewContainerRef.detach();
        x.viewRef = this.conditionComponent1;
        this.conditionComponent1 = null;
        this.onUnwrap.emit(x);
      }
      else if(this.conditionComponent2.instance == x.component) {
        this.viewRef2.viewContainerRef.detach();
        x.viewRef = this.conditionComponent2;
        this.conditionComponent2 = null;
        this.onUnwrap.emit(x);
      }
    }
  }

  /**
   * Convenience getter to retrieve the viewref labeled 'condition1'.
   */
  private get viewRef1() {
    return this.conditionDirectives?.find(x => x.id == 'condition1') ?? null;
  }

  /**
   * Convenience getter to retrieve the viewref labeled 'condition2'.
   */
  private get viewRef2() {
    return this.conditionDirectives?.find(x => x.id == 'condition2') ?? null;
  }
}
