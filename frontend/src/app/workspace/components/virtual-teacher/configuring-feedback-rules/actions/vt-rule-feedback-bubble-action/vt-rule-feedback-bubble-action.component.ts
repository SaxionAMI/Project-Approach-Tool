import { Component, ViewChild } from '@angular/core';
import { DynamicComponentAnchor } from '@app/shared/directives/dynamic-component-anchor/dynamic-component-anchor.directive';
import { VTConfigurableSeverity } from '@app/core/models/virtual-teacher/rules/vt-configurable-severity';
import { VTRuleAction } from '@app/core/models/virtual-teacher/rules/vt-rule-action';
import { VTRuleAttribute } from '@app/core/models/virtual-teacher/rules/vt-rule-attribute';
import { VtRuleActionComponentBase } from '../../vt-rule-action-selector/vt-rule-action-component-base';

@Component({
  selector: 'app-vt-rule-feedback-bubble-action',
  templateUrl: './vt-rule-feedback-bubble-action.component.html',
  styleUrls: ['./vt-rule-feedback-bubble-action.component.css']
})
export class VtRuleFeedbackBubbleActionComponent extends VtRuleActionComponentBase {

  @ViewChild(DynamicComponentAnchor, {static: true})
  _viewRef: DynamicComponentAnchor;

  private _configurableSeverities: VTConfigurableSeverity[];
  public get supportedSeverities(): VTConfigurableSeverity[] {
    return this._configurableSeverities?.filter(x => x.selectable) ?? [];
  }

  private _titleValid: boolean;
  public get titleValid(): boolean {
    return this._titleValid;
  }

  private _subtitleValid: boolean;
  public get subtitleValid(): boolean {
    return this._subtitleValid;
  }

  private _severityValid: boolean;
  public get severityValid(): boolean {
    return this._severityValid;
  }

  private _descriptionValid: boolean;
  public get descriptionValid(): boolean {
    return this._descriptionValid;
  }

  private _titleChanged: boolean;
  public get titleChanged(): boolean {
    return this._titleChanged;
  }

  private _subtitleChanged: boolean;
  public get subtitleChanged(): boolean {
    return this._subtitleChanged;
  }

  private _severityChanged: boolean;
  public get severityChanged(): boolean {
    return this._severityChanged;
  }

  private _descriptionChanged: boolean;
  public get descriptionChanged(): boolean {
    return this._descriptionChanged;
  }

  get viewRef(): DynamicComponentAnchor {
    return this._viewRef;
  }

  public validate() {
    super.validate();
    this._titleValid = this.title?.length > 0 ?? false;
    this._subtitleValid = this.subtitle?.length > 0 ?? false;
    this._severityValid = this.supportedSeverities?.findIndex(x => x.type == this.severity) >= 0 ?? false;
    this._descriptionValid = this.description?.length > 0 ?? false;
    this.isValid = this.isValid && this._titleValid && this._subtitleValid && this._severityValid && this._descriptionValid;
  }

  public makeAction(): VTRuleAction {
    this.secondaryAction = this.secondaryActionComponent?.instance.makeAction() ?? null;
    return new VTRuleAction(this);
  }

  ngOnInit() {
    super.ngOnInit();
    this.rulesService.getVtSeverities().subscribe(x => {
      this._configurableSeverities = x;
      this.onDataChanged();
    });
  }

  get title(): string {
    return this.attributes.find(x => x.key == 'title')?.value ?? '';
  }
  set title(value: string) {
    if (this.title === value) return;
    VTRuleAttribute.setValue(this.attributes, 'title', value);
    this._titleChanged = true;
    this.onDataChanged();
  }

  get subtitle(): string {
    return this.attributes.find(x => x.key == 'subtitle')?.value ?? '';
  }
  set subtitle(value: string) {
    if (this.subtitle === value) return;
    VTRuleAttribute.setValue(this.attributes, 'subtitle', value);
    this._subtitleChanged = true;
    this.onDataChanged();
  }

  get severity(): string {
    return this.attributes.find(x => x.key == 'severity')?.value ?? '';
  }
  set severity(value: string) {
    if (this.severity === value) return;
    VTRuleAttribute.setValue(this.attributes, 'severity', value);
    this._severityChanged = true;
    this.onDataChanged();
  }

  get description(): string {
    return this.attributes.find(x => x.key == 'description')?.value ?? '';
  }
  set description(value: string) {
    if (this.description === value) return;
    VTRuleAttribute.setValue(this.attributes, 'description', value);
    this._descriptionChanged = true;
    this.onDataChanged();
  }
}
