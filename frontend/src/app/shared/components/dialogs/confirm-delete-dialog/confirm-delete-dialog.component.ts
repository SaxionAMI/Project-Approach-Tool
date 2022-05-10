import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { WorkspacelistComponent } from "src/app/workspace/containers/workspacelist/workspacelist.component";

@Component({
  selector: "app-confirm-delete-dialog",
  templateUrl: "./confirm-delete-dialog.component.html",
  styleUrls: ["./confirm-delete-dialog.component.css"],
})
export class ConfirmDeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<WorkspacelistComponent>) {}

  /**
   * Cancel the deletion of a workspace.
   * @returns void
   */
  onBack(): void {
    this.dialogRef.close(false);
  }

  /**
   * Confirm the deletion of a workspace.
   * @returns void
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
