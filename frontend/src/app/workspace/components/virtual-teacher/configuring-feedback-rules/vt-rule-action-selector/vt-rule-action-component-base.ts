import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { Subscription } from "rxjs";
import { DynamicComponentAnchor } from "src/app/shared/directives/dynamic-component-anchor/dynamic-component-anchor.directive";
import { IValidatable } from "src/app/core/models/validation/validatable";
import { VTConfigurableAction } from "src/app/core/models/virtual-teacher/rules/vt-configurable-action";
import {
  IVTRuleAction,
  VTRuleAction,
} from "src/app/core/models/virtual-teacher/rules/vt-rule-action";
import { VTRuleAttribute } from "src/app/core/models/virtual-teacher/rules/vt-rule-attribute";
import { VtActionComponentFactoryService } from "src/app/workspace/services/virtual-teacher/configuring-rules/vt-action-component-factory/vt-action-component-factory.service";
import { VtRulesService } from "src/app/workspace/services/virtual-teacher/configuring-rules/vt-rules-service/vt-rules.service";

@Component({
  templateUrl: "./vt-rule-action-selector-base.html",
})
export class VtRuleActionComponentBase
  implements OnInit, IVTRuleAction, IValidatable<void>, AfterViewInit
{
  constructor(
    protected rulesService: VtRulesService,
    private componentFactory: VtActionComponentFactoryService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.secondaryActionToAdd) {
      setTimeout(() => {
        this.setExistingSecondaryAction(this.secondaryActionToAdd);
        this.changeDetector.detectChanges();
        this.onDataChanged();
      }, 100);
    }
  }

  public onDelete: EventEmitter<VtRuleActionComponentBase> = new EventEmitter();
  public onValidated: EventEmitter<void> = new EventEmitter();

  protected onDataChanged() {
    this.validate();
    this.onValidated.emit();
  }

  isValid: boolean;
  validate() {
    this.isValid =
      (this.configurableActions?.findIndex((x) => x.type == this.type) >= 0 ??
        false) &&
      (this.secondaryActionComponent?.instance.isValid ?? true);
  }

  get viewRef() {
    return null;
  }

  get display() {
    return this.currentActionType?.display ?? "";
  }
  type: string = "";
  attributes: VTRuleAttribute[] = [];
  secondaryAction?: VTRuleAction;
  secondaryActionToAdd: VTRuleAction;

  private __secondaryActionComponent: ComponentRef<VtRuleActionComponentBase>;
  public get secondaryActionComponent(): ComponentRef<VtRuleActionComponentBase> {
    return this.__secondaryActionComponent;
  }
  public set secondaryActionComponent(
    value: ComponentRef<VtRuleActionComponentBase>
  ) {
    if (this.__secondaryActionComponent) {
      this.deleteSecondaryAction();
    }
    this.__secondaryActionComponent = value;
    this.subscribeToChildEvents(this.__secondaryActionComponent.instance);
  }
  private onDeleteSubscription: Subscription;
  private onValidatedSubscription: Subscription;

  private configurableActions: VTConfigurableAction[];
  public get supportedActions(): VTConfigurableAction[] {
    return (
      this.configurableActions?.filter((x) => !x.primary && x.selectable) ?? []
    );
  }

  get currentActionType() {
    return this.configurableActions?.find((x) => x.type == this.type) ?? null;
  }

  ngOnInit(): void {
    this.rulesService.getVtActions().subscribe((x) => {
      this.configurableActions = x;
      this.onDataChanged();
    });
  }

  makeAction() {
    return null;
  }

  public addNewSecondaryAction(type: string) {
    this.componentFactory
      .makeBlankComponent(type, this.viewRef.viewContainerRef)
      .subscribe((x) => {
        this.secondaryActionComponent = x;
        this.onDataChanged();
      });
  }

  public setExistingSecondaryAction(secondaryAction: VTRuleAction) {
    this.componentFactory
      .makeFilledComponent(secondaryAction, this.viewRef.viewContainerRef)
      .subscribe((x) => {
        console.log(this.secondaryActionToAdd);
        this.secondaryActionComponent = x;
        this.onDataChanged();
      });
  }

  public deleteSecondaryAction() {
    if (this.secondaryActionComponent) {
      this.unsubscribeFromChildEvents();
      this.viewRef.viewContainerRef.clear();
      this.secondaryActionComponent.destroy();
      this.__secondaryActionComponent = null;
    }
  }

  public setValues(rule: IVTRuleAction) {
    this.type = rule.type;
    this.attributes = rule.attributes;
    this.secondaryActionToAdd = rule.secondaryAction;
    this.onDataChanged();
    //this.setExistingSecondaryAction(this.secondaryAction);
  }

  public deleteClicked() {
    this.onDelete.emit(this);
  }

  private subscribeToChildEvents(child: VtRuleActionComponentBase) {
    this.onDeleteSubscription = child.onDelete.subscribe((_) =>
      this.deleteSecondaryAction()
    );
    this.onValidatedSubscription = child.onValidated.subscribe((_) =>
      this.onDataChanged()
    );
  }

  private unsubscribeFromChildEvents() {
    this.onDeleteSubscription?.unsubscribe();
    this.onValidatedSubscription?.unsubscribe();
  }
}
