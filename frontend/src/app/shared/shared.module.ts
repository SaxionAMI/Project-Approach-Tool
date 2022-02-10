import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./components/cards/card/card.component";
import { CardSelectorCardComponent } from "./components/cards/card-selector-card/card-selector-card.component";
import { CardDetailModalComponent } from "./components/dialogs/carddetail/card-detail-modal.component";
import { FocusOnShowDirective } from "./directives/focus-on-show.directive";
import { CustomCardComponent } from "./components/dialogs/customcard/customc-card/custom-card.component";
import { ClickStopPropagationDirective } from "./directives/click-stop-propagation.directive";
import { WorkspaceCardComponent } from "./components/cards/workspace-card/workspace-card.component";
import { TemplateCardComponent } from "./components/cards/template-card/template-card.component";
import { ConfirmDeleteDialogComponent } from "./components/dialogs/confirm-delete-dialog/confirm-delete-dialog.component";
import { InviteDialogComponent } from "./components/dialogs/invite-dialog/invite-dialog.component";
import { ConfirmDeleteInviteComponent } from "./components/dialogs/confirm-delete-invite/confirm-delete-invite.component";
import { DeckdialogComponent } from "./components/dialogs/deckdialog/deckdialog.component";
import { SettingsDialogComponent } from "./components/dialogs/settings-dialog/settings-dialog.component";
import { ConfirmDeleteAccountDialogComponent } from "./components/dialogs/confirm-delete-account-dialog/confirm-delete-account-dialog.component";
import { VtRulesListDeleteDialogComponent } from "./components/dialogs/vt-rules-list-delete-dialog/vt-rules-list-delete-dialog.component";
import { DynamicComponentAnchor } from "./directives/dynamic-component-anchor/dynamic-component-anchor.directive";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatDialogModule } from "@angular/material/dialog";
import { ColorPickerModule } from "ngx-color-picker";
import { MatMenuModule } from "@angular/material/menu";
import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    DeckdialogComponent,
    CardComponent,
    CardSelectorCardComponent,
    CardDetailModalComponent,
    FocusOnShowDirective,
    CustomCardComponent,
    ClickStopPropagationDirective,
    WorkspaceCardComponent,
    TemplateCardComponent,
    ConfirmDeleteDialogComponent,
    InviteDialogComponent,
    ConfirmDeleteInviteComponent,
    DeckdialogComponent,
    SettingsDialogComponent,
    ConfirmDeleteAccountDialogComponent,
    VtRulesListDeleteDialogComponent,
    DynamicComponentAnchor,
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    TextFieldModule,
    MatDialogModule,
    ColorPickerModule,
    MatMenuModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    DeckdialogComponent,
    CardComponent,
    CardSelectorCardComponent,
    CardDetailModalComponent,
    FocusOnShowDirective,
    CustomCardComponent,
    ClickStopPropagationDirective,
    WorkspaceCardComponent,
    TemplateCardComponent,
    ConfirmDeleteDialogComponent,
    InviteDialogComponent,
    ConfirmDeleteInviteComponent,
    DeckdialogComponent,
    SettingsDialogComponent,
    ConfirmDeleteAccountDialogComponent,
    VtRulesListDeleteDialogComponent,
    DynamicComponentAnchor,
  ],
  entryComponents: [
    DeckdialogComponent,
    CardDetailModalComponent,
    InviteDialogComponent,
    SettingsDialogComponent,
  ],
})
export class SharedModule {}
