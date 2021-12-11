import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericApiErrorDialogComponent } from 'src/app/core/components/generic-api-error-dialog/generic-api-error-dialog.component';
import { IValidatable } from 'src/app/core/models/validation/validatable';
import { VTRule } from 'src/app/core/models/virtual-teacher/rules/vt-rule';
import { VtRulesService } from 'src/app/workspace/services/virtual-teacher/configuring-rules/vt-rules-service/vt-rules.service';
import { VtEditRuleDiscardConfirmDialogComponent } from '../vt-edit-rule-discard-confirm-dialog/vt-edit-rule-discard-confirm-dialog.component';
import { VtRuleActionSelectorComponent } from '../vt-rule-action-selector/vt-rule-action-selector.component';
import { VtRuleConditionSelectorComponent } from '../vt-rule-condition-selector/vt-rule-condition-selector.component';
import { VtRuleFeedbackmodeSelectorComponent } from '../vt-rule-feedbackmode-selector/vt-rule-feedbackmode-selector.component';

@Component({
  selector: 'app-vt-edit-rule-dialog',
  templateUrl: './vt-edit-rule-dialog.component.html',
  styleUrls: ['./vt-edit-rule-dialog.component.css']
})
export class VtEditRuleDialogComponent implements OnInit, IValidatable<void> {

  @Output()
  changesSaved: EventEmitter<void> = new EventEmitter();

  @ViewChild('phaseSelector')
  phaseSelector: VtRuleFeedbackmodeSelectorComponent;

  @ViewChild('conditionSelector')
  conditionSelector: VtRuleConditionSelectorComponent;

  @ViewChild('actionSelector')
  actionSelector: VtRuleActionSelectorComponent;

  get hasChanged() {
    const rule = this.makeRule();
    console.log('new', rule);
    console.log('original', this._originalRule);
    return !rule.deepEquals(this._originalRule);
  }

  private _originalRule: VTRule;
  rule: VTRule = null;
  private _creatingNew: boolean = false;


  constructor(private dialog: MatDialog, private rulesService: VtRulesService) { }

  validate() {
    this.isValid =
      (this.rule.title?.length > 0 ?? false) &&
      (this.rule.description?.length > 0 ?? false) &&
      this.phasesValid &&
      this.conditionValid &&
      this.actionValid;
  }

  onValidated: EventEmitter<void>;
  isValid: boolean;
  phasesValid: boolean = true;
  conditionValid: boolean = false;
  actionValid: boolean = true;

  makeRule(): VTRule {
    this.rule.phases = this.phaseSelector.makeFeedbackModes();
    this.rule.condition = this.conditionSelector.makeCondition();
    this.rule.action = this.actionSelector.makeAction();
    return this.rule;
  }

  onPhasesValidated(isValid) {
    this.phasesValid = isValid;
    this.validate();
  }

  onConditionValidated(isValid) {
    this.conditionValid = isValid;
    this.validate();
  }

  onActionValidated(isValid) {
    this.actionValid = isValid;
    this.validate();
  }

  ngOnInit(): void {
    this.keyup = this.keyup.bind(this);
    document.addEventListener('keyup', this.keyup);
  }

  keyup(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === 'Escape') {
      this.discardChanges();
    }
  }

  saveChanges() {
    if (!this.hasChanged) {
      this.rule = null;
    }
    else {
      if (this._creatingNew) {
        this.rulesService.createRule(this.rule).subscribe(data => {
          this.rule = null;
          this.changesSaved.emit();
        }, error => {
          //TODO handle server validation result. Didn't have enough time for this.
          this.dialog.open(GenericApiErrorDialogComponent);
        });
      }
      else {
        this.rulesService.updateRule(this.rule).subscribe(data => {
          this.rule = null;
          this.changesSaved.emit();
        }, error => {
          //TODO handle server validation result. Didn't have enough time for this.
          this.dialog.open(GenericApiErrorDialogComponent);
        });
      }
    }
  }

  discardChanges() {
    if (!this.hasChanged) {
      this.rule = null;
    }
    else {
      const dialogRef = this.dialog.open(VtEditRuleDiscardConfirmDialogComponent)
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.rule = null;
        }
      })
    }
  }

  createRule() {
    this._originalRule = new VTRule({
      _id: '',
      action: null,
      condition: null,
      description: '',
      enabled: true,
      configurable: true,
      phases: [],
      title: ''
    });
    this.rule = this._originalRule.deepCopy();
    this.conditionValid = false;
    this.actionValid = false;
    this._creatingNew = true;
  }

  editRule(rule: VTRule) {
    console.log(rule);
    this._originalRule = rule;
    this.rule = rule.deepCopy();
    this.conditionValid = true;
    this.actionValid = true;
    this._creatingNew = false;
  }

  get creating() {
    if (!this.rule) return false;

    return this.rule._id?.length == 0 ?? true;
  }
}
