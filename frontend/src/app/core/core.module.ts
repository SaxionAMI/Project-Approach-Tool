import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from "@angular/material/grid-list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { WorkspaceNavbarComponent } from './components/navbars/workspace-navbar/workspace-navbar.component';
import { GenericApiErrorDialogComponent } from './components/generic-api-error-dialog/generic-api-error-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbars/menu-navbar/navbar.component';
import { JoyrideModule, JoyrideStepComponent } from 'ngx-joyride';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    WorkspaceNavbarComponent,
    GenericApiErrorDialogComponent,
    LoadingComponent,
    NavbarComponent,
    WorkspaceNavbarComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatGridListModule,
    FlexLayoutModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    DragDropModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    JoyrideModule.forRoot(),
    MatDividerModule,
    MatProgressSpinnerModule,
    MatRippleModule,
  ],
  exports: [
    WorkspaceNavbarComponent,
    GenericApiErrorDialogComponent,
    LoadingComponent,
    NavbarComponent,
    WorkspaceNavbarComponent,
    NavbarComponent,
  ],
  entryComponents: [JoyrideStepComponent, GenericApiErrorDialogComponent],
})
export class CoreModule { }
