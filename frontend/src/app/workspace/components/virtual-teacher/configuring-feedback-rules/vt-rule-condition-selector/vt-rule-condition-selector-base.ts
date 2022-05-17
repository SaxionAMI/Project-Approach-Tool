import {
  Component,
  ComponentRef,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { IValidatable } from "src/app/core/models/validation/validatable";
import { VTConfigurableCondition } from "src/app/core/models/virtual-teacher/rules/vt-configurable-condition";
import { VTRuleAttribute } from "src/app/core/models/virtual-teacher/rules/vt-rule-attribute";
import {
  IVTRuleCondition,
  VTRuleCondition,
} from "src/app/core/models/virtual-teacher/rules/vt-rule-condition";
import { VtConditionComponentFactoryService } from "src/app/workspace/services/virtual-teacher/configuring-rules/vt-condition-component-factory/vt-condition-component-factory.service";
import { VtRulesService } from "src/app/workspace/services/virtual-teacher/configuring-rules/vt-rules-service/vt-rules.service";
import { VtRuleMultiConditionComponent } from "../conditions/vt-rule-multi-condition/vt-rule-multi-condition.component";

const _componentParent: string = "componentParent";

@Component({
  templateUrl: "./vt-rule-condition-selector-base.html",
})
export class VtRuleConditionComponentBase
  implements OnInit, IVTRuleCondition, IValidatable<void>
{
  public static componentParent: string = _componentParent;

  @Output()
  onValidated: EventEmitter<void> = new EventEmitter();
  public isValid: boolean;
  validate() {
    this.isValid =
      this.configurableConditions?.findIndex((x) => x.type == this.type) >= 0 ??
      false;
  }

  public get canHaveChildren(): boolean {
    return this.asComponentParent != null;
  }

  public get asComponentParent() {
    const value = <IConditionComponentParent>(<unknown>this);
    console.log(value);
    return value;
  }

  constructor(
    protected ruleService: VtRulesService,
    protected componentFactory: VtConditionComponentFactoryService
  ) {}

  onDataChanged() {
    this.validate();
    this.onValidated.emit();
  }

  type: string;
  get display(): string {
    return (
      this.configurableConditions?.find((x) => x.type == this.type)?.display ??
      ""
    );
  }
  attributes: VTRuleAttribute[];
  condition1: VTRuleCondition;
  condition2: VTRuleCondition;
  get description(): string {
    return (
      this.configurableConditions?.find((x) => x.type == this.type)
        ?.description ?? ""
    );
  }

  public onDelete: EventEmitter<VtRuleConditionComponentBase> =
    new EventEmitter<VtRuleConditionComponentBase>();
  public onWrap: EventEmitter<WrapEventArgs> =
    new EventEmitter<WrapEventArgs>();
  public onUnwrap: EventEmitter<UnwrapEventArgs> =
    new EventEmitter<UnwrapEventArgs>();

  public deleteClicked() {
    this.onDelete.emit(this);
  }

  public wrapClicked(type: string) {
    if (!this.supportsMultiCondition) return;
    this.onWrap.emit({ component: this, type: type });
  }

  public unwrapClicked() {
    if (!this.supportsMultiCondition) return;
    this.onUnwrap.emit({ component: this, viewRef: null, currentParent: null });
  }

  // public makeCondition(): VTRuleCondition {};
  public makeCondition() { return null; }

//   public setValues(condition: IVTRuleCondition);

  public setValues(condition: IVTRuleCondition) {}

  ngOnInit(): void {
    this.ruleService.getVtConditions().subscribe((x) => {
      this.configurableConditions = x;
      this.onDataChanged();
    });
  }

  protected configurableConditions: VTConfigurableCondition[];

//   get supportedConditions(): VTConfigurableCondition[];

  get supportedConditions() {return []};

  public get currentConditionType(): VTConfigurableCondition {
    return (
      this.configurableConditions?.find((x) => x.type == this.type) ?? null
    );
  }
  public get supportsMultiCondition(): boolean {
    return this.currentConditionType?.supportsMultiCondition ?? false;
  }
}

export declare interface WrapEventArgs {
  component: VtRuleConditionComponentBase;
  type: string;
}

export declare interface UnwrapEventArgs {
  component: VtRuleConditionComponentBase;
  viewRef: ComponentRef<VtRuleConditionComponentBase>;
  currentParent: VtRuleMultiConditionComponent;
}

export declare interface IConditionComponentParent {
  type: string;

  deleteChild(child: VtRuleConditionComponentBase);

  addChild(conditionType: string);

  wrapChild(child: VtRuleConditionComponentBase, type: string);

  adoptChild(child: ComponentRef<VtRuleConditionComponentBase>);

  unwrapChild(
    child: ComponentRef<VtRuleConditionComponentBase>,
    currentParent: VtRuleMultiConditionComponent
  );

  subscribeToChildEvents(child: VtRuleConditionComponentBase);

  unsubscribeFromChildEvents();

  ngOnDestroy();
}
