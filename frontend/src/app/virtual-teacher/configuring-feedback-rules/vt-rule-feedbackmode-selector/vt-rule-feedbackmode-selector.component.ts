import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { IValidatable } from 'src/app/models/validation/validatable';
import { VTRule } from 'src/app/models/virtual-teacher/rules/vt-rule';
import { VTRuleFeedbackMode } from 'src/app/models/virtual-teacher/rules/vt-rule-feedback-mode';
import { VtRulesService } from 'src/app/services/virtual-teacher/configuring-rules/vt-rules-service/vt-rules.service';

@Component({
  selector: 'app-vt-rule-feedbackmode-selector',
  templateUrl: './vt-rule-feedbackmode-selector.component.html',
  styleUrls: ['./vt-rule-feedbackmode-selector.component.css']
})
export class VtRuleFeedbackmodeSelectorComponent implements OnInit, IValidatable<boolean> {
  constructor(private rulesService: VtRulesService) { }

  public availablePhases: VTSelectablePhase[];

  @Input() rule: VTRule;

  public configurablePhases: VTSelectablePhase[];
  
  onValidated: EventEmitter<boolean> = new EventEmitter();
  isValid: boolean;

  validate() {
    this.isValid = this.rule.phases.length > 0;
  }

  onDataChanged() {
    this.validate();
    this.onValidated.emit(this.isValid);
  }

  ngOnInit(): void {
    this.rulesService.getVtPhases().subscribe(phases => {
      this.configurablePhases = phases.map(phase => {
        const selected = this.rule.phases.findIndex(x => x.identifier == phase.identifier) >= 0;
        return new VTSelectablePhase(phase.display, phase.identifier, selected)
      });
    })
  }

  makeFeedbackModes(): VTRuleFeedbackMode[] {
    return this.rule.phases;
  }

  onCheckedChanged(phase: VTSelectablePhase) {
    if (phase.selected) {
      const existingIndex = this.rule.phases.findIndex(x => x.identifier == phase.identifier);
      if (existingIndex < 0) {
        this.rule.phases.push(new VTRuleFeedbackMode({identifier: phase.identifier, display: phase.display}));
      }
    }
    else {
      const existingIndex = this.rule.phases.findIndex(x => x.identifier == phase.identifier);
      if (existingIndex >= 0) {
        this.rule.phases.splice(existingIndex)
      }
    }
  }
}

export class VTSelectablePhase {
  display: string;
  identifier: string;
  selected: boolean;

  constructor(display: string, identifier: string, selected: boolean) {
    this.display = display;
    this.identifier = identifier;
    this.selected = selected;
  }
}
