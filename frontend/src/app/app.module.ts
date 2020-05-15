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
import { CardComponent } from "./card/card.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatDialogModule, } from "@angular/material/dialog";
import { CardSelectorComponent } from "./dialogs/cardselector/cardselector.component";
import { CardSelectorCardComponent } from "./dialogs/cardselector/card-selector-card/card-selector-card.component";
import { MatCardModule } from "@angular/material/card";
import { CardDetailModalComponent } from "./dialogs/carddetail/card-detail-modal.component";
import { FocusOnShowDirective } from './directives/focus-on-show.directive';
import { AutoSizeInputModule } from 'ngx-autosize-input';
import { TemplateselectorComponent } from './templateselector/templateselector.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PassworddialogComponent } from './dialogs/passworddialog/passworddialog.component';
import { CustomCardComponent } from './dialogs/customcard/customc-card/custom-card.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FlipModule } from 'ngx-flip';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';



@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    CardComponent,
    CardSelectorComponent,
    CardSelectorCardComponent,
    CardDetailModalComponent,
    FocusOnShowDirective,
    TemplateselectorComponent,
    PassworddialogComponent,
    CustomCardComponent,
    ClickStopPropagationDirective,
  ],
  imports: [
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
    FlipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    CardSelectorComponent,
    MatCardModule,
    CardDetailModalComponent,
    MatFormFieldModule,
    MatInputModule,
    CustomCardComponent
  ],
  entryComponents: [CardSelectorComponent, CardDetailModalComponent, CustomCardComponent]
})
export class AppModule { }
