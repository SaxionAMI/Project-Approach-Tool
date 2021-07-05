import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { GroupComponent } from "./group/group.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CardComponent } from "./cards/card/card.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { CardSelectorCardComponent } from "./cards/card-selector-card/card-selector-card.component";
import { MatCardModule } from "@angular/material/card";
import { CardDetailModalComponent } from "./dialogs/carddetail/card-detail-modal.component";
import { FocusOnShowDirective } from "./directives/focus-on-show.directive";
import { AutoSizeInputModule } from "ngx-autosize-input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CustomCardComponent } from "./dialogs/customcard/customc-card/custom-card.component";
import { ColorPickerModule } from "ngx-color-picker";
import { FlipModule } from "ngx-flip";
import { MatListModule } from "@angular/material/list";
import { ClickStopPropagationDirective } from "./directives/click-stop-propagation.directive";
import { WorkspaceComponent } from "./workspace/workspace.component";
import { WorkspacelistComponent } from "./workspacelist/workspacelist.component";
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from "./navbars/menu-navbar/navbar.component";
import { CreateWorkspaceComponent } from "./create-workspace/create-workspace.component";
import { WorkspaceCardComponent } from "./cards/workspace-card/workspace-card.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TemplateCardComponent } from "./cards/template-card/template-card.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { LoadingComponent } from "./loading/loading.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";
import { ConfirmDeleteDialogComponent } from "./dialogs/confirm-delete-dialog/confirm-delete-dialog.component";
import { AuthComponent } from "./auth/auth.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { angularFirebaseConfig } from "../environments/environment";
import { FinishAuthComponent } from "./finish-auth/finish-auth.component";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { WorkspaceNavbarComponent } from "./navbars/workspace-navbar/workspace-navbar.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { MatSelectModule } from "@angular/material/select";
import { InviteDialogComponent } from "./dialogs/invite-dialog/invite-dialog.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatTableModule } from "@angular/material/table";
import { ConfirmDeleteInviteComponent } from "./dialogs/confirm-delete-invite/confirm-delete-invite.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DeckdialogComponent } from "./dialogs/deckdialog/deckdialog.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SettingsDialogComponent } from "./dialogs/settings-dialog/settings-dialog.component";
import { ConfirmDeleteAccountDialogComponent } from "./dialogs/confirm-delete-account-dialog/confirm-delete-account-dialog.component";
import { JoyrideModule, JoyrideStepComponent } from "ngx-joyride";
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { VtDashboardComponent } from './virtual-teacher/dashboard/vt-dashboard/vt-dashboard.component';
import { VtModeSelectorComponent } from './virtual-teacher/dashboard/vt-mode-selector/vt-mode-selector.component';
import { VTFeedbackBubbleComponent } from './virtual-teacher/feedback-popup/vt-feedback-bubble/vt-feedback-bubble.component';
import { VTFeedbackBubbleDialogComponent } from './virtual-teacher/feedback-popup/vt-feedback-bubble-dialog/vt-feedback-bubble-dialog.component';
import { VtTriangulationMetricComponent } from './virtual-teacher/dashboard/vt-triangulation-metric/vt-triangulation-metric.component';
import { VtStrategyMetricComponent } from './virtual-teacher/dashboard/vt-strategy-metric/vt-strategy-metric.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VtSettingsStudentComponent } from './virtual-teacher/student-settings/vt-settings-student/vt-settings-student.component';
import { VtDisableDialogComponent } from './virtual-teacher/student-settings/vt-disable-dialog/vt-disable-dialog.component';
import { VtRulesListComponent } from './virtual-teacher/configuring-feedback-rules/vt-rules-list/vt-rules-list.component';
import { TeacherSettingsPageComponent } from './teacher-settings-page/teacher-settings-page.component';
import { VtFeedbackModeActiveIconComponent } from './virtual-teacher/configuring-feedback-rules/vt-feedback-mode-active-icon/vt-feedback-mode-active-icon.component';
import { VtRulesListDeleteDialogComponent } from './dialogs/vt-rules-list-delete-dialog/vt-rules-list-delete-dialog.component';
import { VtEditRuleDialogComponent } from './virtual-teacher/configuring-feedback-rules/vt-edit-rule-dialog/vt-edit-rule-dialog.component';
import { VtEditRuleDiscardConfirmDialogComponent } from "./virtual-teacher/configuring-feedback-rules/vt-edit-rule-discard-confirm-dialog/vt-edit-rule-discard-confirm-dialog.component";
import { VtRuleConditionSelectorComponent } from './virtual-teacher/configuring-feedback-rules/vt-rule-condition-selector/vt-rule-condition-selector.component';
import { DynamicComponentAnchor } from "./directives/dynamic-component-anchor/dynamic-component-anchor.directive";
import { VtRuleCountConditionComponent } from './virtual-teacher/configuring-feedback-rules/conditions/vt-rule-count-condition/vt-rule-count-condition.component';
import { VtRuleParameterlessConditionComponent } from './virtual-teacher/configuring-feedback-rules/conditions/vt-rule-parameterless-condition/vt-rule-parameterless-condition.component';
import { VtRuleMultiConditionComponent } from './virtual-teacher/configuring-feedback-rules/conditions/vt-rule-multi-condition/vt-rule-multi-condition.component';
import { VtRuleFeedbackmodeSelectorComponent } from './virtual-teacher/configuring-feedback-rules/vt-rule-feedbackmode-selector/vt-rule-feedbackmode-selector.component';
import { VtRuleActionSelectorComponent } from './virtual-teacher/configuring-feedback-rules/vt-rule-action-selector/vt-rule-action-selector.component';
import { VtRuleFeedbackBubbleActionComponent } from './virtual-teacher/configuring-feedback-rules/actions/vt-rule-feedback-bubble-action/vt-rule-feedback-bubble-action.component';
import { VtRuleOpenWebpageComponent } from './virtual-teacher/configuring-feedback-rules/actions/vt-rule-open-webpage/vt-rule-open-webpage.component';
import { VtRuleOpenCatalogTabComponent } from './virtual-teacher/configuring-feedback-rules/actions/vt-rule-open-catalog-tab/vt-rule-open-catalog-tab.component';
import { GenericApiErrorDialogComponent } from './generic-api-error-dialog/generic-api-error-dialog.component';
import { UserRoleListComponent } from './user-role-list/user-role-list.component';
import { VtRuleCountMethodsInStrategyConditionComponent } from './virtual-teacher/configuring-feedback-rules/conditions/vt-rule-count-methods-in-strategy-condition/vt-rule-count-methods-in-strategy-condition.component';
import { VtRuleOpenSearchTabComponent } from './virtual-teacher/configuring-feedback-rules/actions/vt-rule-open-search-tab/vt-rule-open-search-tab.component';
import { AngularResizedEventModule } from "angular-resize-event";
@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    CardComponent,
    CardSelectorCardComponent,
    CardDetailModalComponent,
    FocusOnShowDirective,
    CustomCardComponent,
    ClickStopPropagationDirective,
    WorkspaceComponent,
    WorkspacelistComponent,
    NavbarComponent,
    CreateWorkspaceComponent,
    WorkspaceCardComponent,
    TemplateCardComponent,
    LoadingComponent,
    ConfirmDeleteDialogComponent,
    AuthComponent,
    FinishAuthComponent,
    WorkspaceNavbarComponent,
    InviteDialogComponent,
    ConfirmDeleteInviteComponent,
    DeckdialogComponent,
    SettingsDialogComponent,
    ConfirmDeleteAccountDialogComponent,
    AboutComponent,
    PrivacyComponent,
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
    TeacherSettingsPageComponent,
    VtFeedbackModeActiveIconComponent,
    VtRulesListDeleteDialogComponent,
    VtEditRuleDialogComponent,
    VtEditRuleDiscardConfirmDialogComponent,
    DynamicComponentAnchor,
    VtRuleConditionSelectorComponent,
    VtRuleCountConditionComponent,
    VtRuleParameterlessConditionComponent,
    VtRuleMultiConditionComponent,
    VtRuleFeedbackmodeSelectorComponent,
    VtRuleActionSelectorComponent,
    VtRuleFeedbackBubbleActionComponent,
    VtRuleOpenWebpageComponent,
    VtRuleOpenCatalogTabComponent,
    GenericApiErrorDialogComponent,
    UserRoleListComponent,
    VtRuleCountMethodsInStrategyConditionComponent,
    VtRuleOpenSearchTabComponent,
  ],
  imports: [
    JoyrideModule.forRoot(),
    AngularFireModule.initializeApp(angularFirebaseConfig),
    AngularFireAuthModule,
    ScrollingModule,
    AppRoutingModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    DragDropModule,
    MatSidenavModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    AutoSizeInputModule,
    MatSnackBarModule,
    ColorPickerModule,
    FlipModule,
    MatGridListModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatTooltipModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressBarModule,
    AngularResizedEventModule
  ],
  providers: [
    AngularFireAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [
    MatCardModule,
    CardDetailModalComponent,
    MatFormFieldModule,
    MatInputModule,
    CustomCardComponent,
  ],
  entryComponents: [
    JoyrideStepComponent,
    CardDetailModalComponent,
    CustomCardComponent,
    ConfirmDeleteDialogComponent,
    InviteDialogComponent,
    ConfirmDeleteInviteComponent,
    DeckdialogComponent,
    SettingsDialogComponent,
    ConfirmDeleteAccountDialogComponent,
    VTFeedbackBubbleDialogComponent,
    VtDisableDialogComponent,
    VtRulesListDeleteDialogComponent,
    VtEditRuleDiscardConfirmDialogComponent,
    VtRuleCountConditionComponent,
    VtRuleMultiConditionComponent,
    VtRuleParameterlessConditionComponent,
    VtRuleFeedbackBubbleActionComponent,
    VtRuleOpenWebpageComponent,
    VtRuleOpenCatalogTabComponent,
    GenericApiErrorDialogComponent,
    VtRuleCountMethodsInStrategyConditionComponent,
    VtRuleOpenSearchTabComponent,
  ],
})
// eslint-disable-next-line require-jsdoc
export class AppModule {}
