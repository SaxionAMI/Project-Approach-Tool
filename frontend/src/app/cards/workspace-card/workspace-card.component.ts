import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Workspace } from "src/app/models/workspace.model";
import { TemplateService } from "src/app/services/template.service";
import { WorkspaceService } from "src/app/services/workspace.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDeleteDialogComponent } from "src/app/dialogs/confirm-delete-dialog/confirm-delete-dialog.component";
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from "@angular/material/snack-bar";
@Component({
  selector: "app-workspace-card",
  templateUrl: "./workspace-card.component.html",
  styleUrls: ["./workspace-card.component.css"],
})
export class WorkspaceCardComponent {
  firstSnackbarRef: MatSnackBarRef<SimpleSnackBar>;

  @Output() deleteConfirmation: EventEmitter<any> = new EventEmitter();
  @Output() addCopy: EventEmitter<Workspace> = new EventEmitter();
  @Input() workspace: Workspace;
  constructor(
    private router: Router,
    private templateService: TemplateService,
    private workspaceService: WorkspaceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Go to the workspace.
   * @returns void
   */
  goToWorkspace(): void {
    this.router.navigate(["workspace/" + this.workspace._id]);
  }

  /**
   * Create a template from a workspace.
   * @returns void
   */
  createTemplate(): void {
    if (!this.workspace.image) {
      this.workspace.image = "../../../../../assets/image/whiteSmoke.PNG";
    }
    this.templateService.postTemplate(this.workspace).subscribe((res) => {
      if (res) {
        this.snackBar.open(
          "Template of this workspace has now been created!",
          "Cancel"
        );
      }
    });
  }

  /**
   * Create a copy from a workspace.
   * @returns void
   */
  createCopy(): void {
    const ws: Workspace = new Workspace();
    ws.goal = this.workspace.goal;
    ws.groups = this.workspace.groups;
    ws.image = this.workspace.image;
    ws.storedLines = this.workspace.storedLines;
    ws.title = this.workspace.title + " - copy";
    this.addCopy.emit(ws);
    this.snackBar.open(
      "Copy of this workspace has now been created!",
      "Cancel"
    );
  }

  /**
   * open a dialog and delete workspace.
   * @returns void
   */
  deleteWorkspace(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteConfirmation.emit(this.workspace._id);
        this.snackBar.open("Workspace has now been deleted!", "Cancel");
      }
    });
  }
}
