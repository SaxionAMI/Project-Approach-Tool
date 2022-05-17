import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtDashboardComponent } from './components/virtual-teacher/dashboard/vt-dashboard/vt-dashboard.component';
import { VtModeSelectorComponent } from './components/virtual-teacher/dashboard/vt-mode-selector/vt-mode-selector.component';
import { VTFeedbackBubbleComponent } from './components/virtual-teacher/feedback-popup/vt-feedback-bubble/vt-feedback-bubble.component';
import { VTFeedbackBubbleDialogComponent } from './components/virtual-teacher/feedback-popup/vt-feedback-bubble-dialog/vt-feedback-bubble-dialog.component';
import { VtTriangulationMetricComponent } from './components/virtual-teacher/dashboard/vt-triangulation-metric/vt-triangulation-metric.component';
import { VtStrategyMetricComponent } from './components/virtual-teacher/dashboard/vt-strategy-metric/vt-strategy-metric.component';
import { VtSettingsStudentComponent } from './components/virtual-teacher/student-settings/vt-settings-student/vt-settings-student.component';
import { VtDisableDialogComponent } from './components/virtual-teacher/student-settings/vt-disable-dialog/vt-disable-dialog.component';
import { VtRulesListComponent } from './components/virtual-teacher/configuring-feedback-rules/vt-rules-list/vt-rules-list.component';
import { VtFeedbackModeActiveIconComponent } from './components/virtual-teacher/configuring-feedback-rules/vt-feedback-mode-active-icon/vt-feedback-mode-active-icon.component';
import { VtEditRuleDialogComponent } from './components/virtual-teacher/configuring-feedback-rules/vt-edit-rule-dialog/vt-edit-rule-dialog.component';
import { VtEditRuleDiscardConfirmDialogComponent } from './components/virtual-teacher/configuring-feedback-rules/vt-edit-rule-discard-confirm-dialog/vt-edit-rule-discard-confirm-dialog.component';
import { VtRuleConditionSelectorComponent } from './components/virtual-teacher/configuring-feedback-rules/vt-rule-condition-selector/vt-rule-condition-selector.component';
import { VtRuleCountConditionComponent } from './components/virtual-teacher/configuring-feedback-rules/conditions/vt-rule-count-condition/vt-rule-count-condition.component';
import { VtRuleParameterlessConditionComponent } from './components/virtual-teacher/configuring-feedback-rules/conditions/vt-rule-parameterless-condition/vt-rule-parameterless-condition.component';
import { VtRuleMultiConditionComponent } from './components/virtual-teacher/configuring-feedback-rules/conditions/vt-rule-multi-condition/vt-rule-multi-condition.component';
import { VtRuleFeedbackmodeSelectorComponent } from './components/virtual-teacher/configuring-feedback-rules/vt-rule-feedbackmode-selector/vt-rule-feedbackmode-selector.component';
import { VtRuleActionSelectorComponent } from './components/virtual-teacher/configuring-feedback-rules/vt-rule-action-selector/vt-rule-action-selector.component';
import { VtRuleFeedbackBubbleActionComponent } from './components/virtual-teacher/configuring-feedback-rules/actions/vt-rule-feedback-bubble-action/vt-rule-feedback-bubble-action.component';
import { VtRuleOpenWebpageComponent } from './components/virtual-teacher/configuring-feedback-rules/actions/vt-rule-open-webpage/vt-rule-open-webpage.component';
import { VtRuleOpenCatalogTabComponent } from './components/virtual-teacher/configuring-feedback-rules/actions/vt-rule-open-catalog-tab/vt-rule-open-catalog-tab.component';
import { VtRuleCountMethodsInStrategyConditionComponent } from './components/virtual-teacher/configuring-feedback-rules/conditions/vt-rule-count-methods-in-strategy-condition/vt-rule-count-methods-in-strategy-condition.component';
import { VtRuleOpenSearchTabComponent } from './components/virtual-teacher/configuring-feedback-rules/actions/vt-rule-open-search-tab/vt-rule-open-search-tab.component';
import { GroupComponent } from './components/group/group.component';
import { WorkspaceComponent } from './components/workspace-com/workspace.component';
import { WorkspacelistComponent } from './containers/workspacelist/workspacelist.component';
import { CreateWorkspaceComponent } from './containers/create-workspace/create-workspace.component';
import { SharedModule } from '@app/shared/shared.module';
import { VtRuleConditionComponentBase } from './components/virtual-teacher/configuring-feedback-rules/vt-rule-condition-selector/vt-rule-condition-selector-base';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CoreModule } from '@app/core/core.module';
import { JoyrideModule } from 'ngx-joyride';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VtRuleActionComponentBase } from './components/virtual-teacher/configuring-feedback-rules/vt-rule-action-selector/vt-rule-action-component-base';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { ProjectPlanningComponent } from './components/project-planning/project-planning.component';
import { RouterModule } from "@angular/router";
import { DxGanttModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    VtRuleConditionComponentBase,
    VtRuleActionComponentBase,
    WorkspacelistComponent,
    CreateWorkspaceComponent,
    VtDashboardComponent,
    VtModeSelectorComponent,
    VtTriangulationMetricComponent,
    VtStrategyMetricComponent,
    VtSettingsStudentComponent,
    VtDisableDialogComponent,
    VtRulesListComponent,
    VtFeedbackModeActiveIconComponent,
    VtEditRuleDialogComponent,
    VtEditRuleDiscardConfirmDialogComponent,
    VtRuleConditionSelectorComponent,
    VtRuleCountConditionComponent,
    VtRuleParameterlessConditionComponent,
    VtRuleMultiConditionComponent,
    VtRuleFeedbackmodeSelectorComponent,
    VtRuleActionSelectorComponent,
    VtRuleFeedbackBubbleActionComponent,
    VtRuleOpenWebpageComponent,
    VtRuleOpenCatalogTabComponent,
    VtRuleCountMethodsInStrategyConditionComponent,
    VtRuleOpenSearchTabComponent,
    VtSettingsStudentComponent,
    VtDisableDialogComponent,
    VtRulesListComponent,
    VtFeedbackModeActiveIconComponent,
    VtEditRuleDialogComponent,
    VtEditRuleDiscardConfirmDialogComponent,
    VtRuleConditionSelectorComponent,
    VtRuleCountConditionComponent,
    VtRuleParameterlessConditionComponent,
    VtRuleMultiConditionComponent,
    VtRuleFeedbackmodeSelectorComponent,
    VtRuleActionSelectorComponent,
    VtRuleFeedbackBubbleActionComponent,
    VtRuleOpenWebpageComponent,
    VtRuleOpenCatalogTabComponent,
    VtRuleCountMethodsInStrategyConditionComponent,
    VtRuleOpenSearchTabComponent,
    VtDashboardComponent,
    VtModeSelectorComponent,
    VtTriangulationMetricComponent,
    VtStrategyMetricComponent,
    GroupComponent,
    WorkspaceComponent,
    WorkspacelistComponent,
    CreateWorkspaceComponent,
    VtDashboardComponent,
    VtModeSelectorComponent,
    VTFeedbackBubbleComponent,
    VTFeedbackBubbleComponent,
    VTFeedbackBubbleDialogComponent,
    VtTriangulationMetricComponent,
    VtStrategyMetricComponent,
    VtSettingsStudentComponent,
    VtDisableDialogComponent,
    VtRulesListComponent,
    VtFeedbackModeActiveIconComponent,
    VtEditRuleDialogComponent,
    VtEditRuleDiscardConfirmDialogComponent,
    VtRuleConditionSelectorComponent,
    VtRuleCountConditionComponent,
    VtRuleParameterlessConditionComponent,
    VtRuleMultiConditionComponent,
    VtRuleFeedbackmodeSelectorComponent,
    VtRuleActionSelectorComponent,
    VtRuleFeedbackBubbleActionComponent,
    VtRuleOpenWebpageComponent,
    VtRuleOpenCatalogTabComponent,
    VtRuleCountMethodsInStrategyConditionComponent,
    VtRuleOpenSearchTabComponent,
    ProjectPlanningComponent,
  ],
  exports: [
    VtRuleConditionComponentBase,
    VtRuleActionComponentBase,
    WorkspacelistComponent,
    CreateWorkspaceComponent,
    VtDashboardComponent,
    VtModeSelectorComponent,
    VtTriangulationMetricComponent,
    VtStrategyMetricComponent,
    VtSettingsStudentComponent,
    VtDisableDialogComponent,
    VtRulesListComponent,
    VtFeedbackModeActiveIconComponent,
    VtEditRuleDialogComponent,
    VtEditRuleDiscardConfirmDialogComponent,
    VtRuleConditionSelectorComponent,
    VtRuleCountConditionComponent,
    VtRuleParameterlessConditionComponent,
    VtRuleMultiConditionComponent,
    VtRuleFeedbackmodeSelectorComponent,
    VtRuleActionSelectorComponent,
    VtRuleFeedbackBubbleActionComponent,
    VtRuleOpenWebpageComponent,
    VtRuleOpenCatalogTabComponent,
    VtRuleCountMethodsInStrategyConditionComponent,
    VtRuleOpenSearchTabComponent,
    VtSettingsStudentComponent,
    VtDisableDialogComponent,
    VtRulesListComponent,
    VtFeedbackModeActiveIconComponent,
    VtEditRuleDialogComponent,
    VtEditRuleDiscardConfirmDialogComponent,
    VtRuleConditionSelectorComponent,
    VtRuleCountConditionComponent,
    VtRuleParameterlessConditionComponent,
    VtRuleMultiConditionComponent,
    VtRuleFeedbackmodeSelectorComponent,
    VtRuleActionSelectorComponent,
    VtRuleFeedbackBubbleActionComponent,
    VtRuleOpenWebpageComponent,
    VtRuleOpenCatalogTabComponent,
    VtRuleCountMethodsInStrategyConditionComponent,
    VtRuleOpenSearchTabComponent,
    VtDashboardComponent,
    VtModeSelectorComponent,
    VtTriangulationMetricComponent,
    VtStrategyMetricComponent,
    GroupComponent,
    WorkspaceComponent,
    WorkspacelistComponent,
    CreateWorkspaceComponent,
    VtDashboardComponent,
    VtModeSelectorComponent,
    VTFeedbackBubbleComponent,
    VTFeedbackBubbleComponent,
    VTFeedbackBubbleDialogComponent,
    VtTriangulationMetricComponent,
    VtStrategyMetricComponent,
    VtSettingsStudentComponent,
    VtDisableDialogComponent,
    VtRulesListComponent,
    VtFeedbackModeActiveIconComponent,
    VtEditRuleDialogComponent,
    VtEditRuleDiscardConfirmDialogComponent,
    VtRuleConditionSelectorComponent,
    VtRuleCountConditionComponent,
    VtRuleParameterlessConditionComponent,
    VtRuleMultiConditionComponent,
    VtRuleFeedbackmodeSelectorComponent,
    VtRuleActionSelectorComponent,
    VtRuleFeedbackBubbleActionComponent,
    VtRuleOpenWebpageComponent,
    VtRuleOpenCatalogTabComponent,
    VtRuleCountMethodsInStrategyConditionComponent,
    VtRuleOpenSearchTabComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    CoreModule,
    SharedModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    JoyrideModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatProgressBarModule,
    DragDropModule,
    MatInputModule,
    DxGanttModule,
  ],
  entryComponents: [VtDisableDialogComponent]
})
export class WorkspaceModule { }
