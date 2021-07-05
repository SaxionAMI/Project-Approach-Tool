import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VtRulesListDeleteDialogComponent } from 'src/app/dialogs/vt-rules-list-delete-dialog/vt-rules-list-delete-dialog.component';
import { GenericApiErrorDialogComponent } from 'src/app/generic-api-error-dialog/generic-api-error-dialog.component';
import { FilterableCollection } from 'src/app/models/filters/filterable-collection';
import { StringContainsFilter } from 'src/app/models/filters/string-contains-filter';
import { ThreeWayFilter } from 'src/app/models/filters/three-way-filter';
import { ValueCycleFilter } from 'src/app/models/filters/value-cycle-filter';
import { VTRule } from 'src/app/models/virtual-teacher/rules/vt-rule';
import { VtRulesService } from 'src/app/services/virtual-teacher/configuring-rules/vt-rules-service/vt-rules.service';
import { VtEditRuleDialogComponent } from '../vt-edit-rule-dialog/vt-edit-rule-dialog.component';

const filterIconOff = 'indeterminate_check_box_outline';
const filterIconOn = 'check_box_outline';
const filterIconMaybe = 'check_box_outline_blank';

@Component({
  selector: 'app-vt-rules-list',
  templateUrl: './vt-rules-list.component.html',
  styleUrls: ['./vt-rules-list.component.css']
})
export class VtRulesListComponent implements OnInit {
  private _hasActions: boolean;

  @Output()
  ruleEnabledChanged: EventEmitter<RuleEnabledChangedEventArgs> = new EventEmitter();

  @Input('has-actions')
  get hasActions() { return this._hasActions; }
  set hasActions(value: any) { this._hasActions = coerceBooleanProperty(value); }

  displayedColumns: string[];

  constructor(private vtRuleService: VtRulesService, private dialog: MatDialog) { }

  readonly typeFilter = new ValueCycleFilter(x => x.type, ['warning', 'info', 'question', 'metrics']);
  readonly isCreatingFilter = new ThreeWayFilter('isCreating', item => item.isCreating, filterIconOff, filterIconOn, filterIconMaybe);
  readonly isEditingFilter = new ThreeWayFilter('isEditing', item => item.isEditing, filterIconOff, filterIconOn, filterIconMaybe);
  readonly isReviewingFilter = new ThreeWayFilter('isReviewing', item => item.isReviewing, filterIconOff, filterIconOn, filterIconMaybe);
  readonly descriptionFilter = new StringContainsFilter(x => x.name);
  readonly isEnabledFilter = new ThreeWayFilter('isEnabled', item => item.isEnabled, filterIconOff, filterIconOn, filterIconMaybe);

  private _vtRules: FilterableCollection<VTRulesListItem> = new FilterableCollection([], [
    this.typeFilter,
    this.isCreatingFilter,
    this.isEditingFilter,
    this.isReviewingFilter,
    this.descriptionFilter,
    this.isEnabledFilter,
  ]);

  get vtRules() {
    return this._vtRules.items;
  }

  @Input()
  getIsRuleEnabled: Function = (rule: VTRule) => rule.enabled;
  @Input()
  setIsRuleEnabled: Function = (rule: VTRule, value: boolean) => rule.enabled = value;
  @Input()
  showRule: Function = (rule: VTRule) => true;
  @Input()
  getRules: Function = (service: VtRulesService) => service.getVtRules();

  @ViewChild('editRuleDialog') editRuleDialog: VtEditRuleDialogComponent;

  ngOnInit(): void {
    this.displayedColumns = this.hasActions ? 
      ['type', 'isCreating', 'isEditing', 'isReviewing', 'name', 'enabled', 'actions']:
      ['type', 'isCreating', 'isEditing', 'isReviewing', 'name', 'enabled'];

    this.loadRules();
  }

  loadRules() {
    this.getRules(this.vtRuleService).subscribe(data => {
      const rules = data.map(x => new VTRule(x));
      const items = rules.map(x => new VTRulesListItem(x, this.getIsRuleEnabled, this.setIsRuleEnabled));
      this._vtRules.replaceItems(items);
    });
  }

  editRule(rule: VTRulesListItem) {
    if (!this.hasActions) return;
    this.editRuleDialog.editRule(rule.getRule());
  }

  deleteRule(rule: VTRulesListItem) {
    if (!this.hasActions) return;
    const dialogRef = this.dialog.open(VtRulesListDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.vtRuleService.deleteRule(rule.id).subscribe(x => {
          this.loadRules();
        }, _ => {
          this.dialog.open(GenericApiErrorDialogComponent);
        })
      }
    })
  }

  createRule() {
    if (!this.hasActions) return;
    this.editRuleDialog.createRule();
  }

  typeClass(type) {
    return 'type ' + type;
  }

  typeIcon(type) {
    switch(type) {
      case 'warning': return '!';
      case 'information': return 'i';
      case 'question': return '?';
      case 'metrics': return '%';
    }
  }

  typeFilterClass() {
    switch(this.typeFilter.state)  {
      case 0: return 'type';
      case 1: return 'type warning';
      case 2: return 'type information';
      case 3: return 'type question';
      case 4: return 'type metrics';
    }
  }

  typeFilterIcon() {
    switch(this.typeFilter.state)  {
      case 0: return '*';
      case 1: return '!';
      case 2: return 'i';
      case 3: return '?';
      case 4: return '%';
    }
  }

  resetFilters() {
    this.typeFilter.reset();
    this.isCreatingFilter.reset();
    this.isEditingFilter.reset();
    this.isReviewingFilter.reset();
    this.descriptionFilter.reset();
    this.isEnabledFilter.reset();
  }

  onRuleEnabledChanged(rule: VTRulesListItem) {
    this.ruleEnabledChanged.emit({
      enabled: rule.isEnabled,
      id: rule.id
    });
  }
}

export class VTRulesListItem {
  constructor(rule: VTRule, getEnabled: Function, setEnabled: Function) {
    this.id = rule._id;
    this.isCreating   = rule.phases.findIndex(x => x.identifier == "creating")   >= 0;
    this.isEditing    = rule.phases.findIndex(x => x.identifier == "editing")    >= 0;
    this.isReviewing  = rule.phases.findIndex(x => x.identifier == "reviewing")  >= 0;
    this.name = rule.title;
    this.description  = rule.description;
    this.rule = rule;
    this.isConfigurable = rule.configurable;

    this.getEnabled = getEnabled;
    this.setEnabled = setEnabled;

    const type = rule.action.attributes.find(x => x.key == 'severity');
    if (type) this.type = type.value;
  }

  private rule: VTRule;
  private getEnabled: Function;
  private setEnabled: Function;

  name: string;
  type: string;
  id: string;
  isCreating: boolean;
  isEditing: boolean;
  isReviewing: boolean;
  description: string;
  isConfigurable: boolean;

  getRule(): VTRule {
    return this.rule;
  }

  get isEnabled(): boolean {
    return this.getEnabled(this.rule);
  }
  set isEnabled(value: boolean) {
    this.setEnabled(this.rule, value);
  }
}

export class RuleEnabledChangedEventArgs {
  id: string;
  enabled: boolean;
}
