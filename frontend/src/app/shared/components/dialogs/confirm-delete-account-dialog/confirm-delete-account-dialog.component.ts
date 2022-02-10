import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { SettingsDialogComponent } from "../settings-dialog/settings-dialog.component";

@Component({
  selector: "app-confirm-delete-account-dialog",
  templateUrl: "./confirm-delete-account-dialog.component.html",
  styleUrls: ["./confirm-delete-account-dialog.component.css"],
})
export class ConfirmDeleteAccountDialogComponent {
  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>) {}

  /**
   * Confirm the deletion of a user account.
   * @returns void
   */
  onYes(): void {
    this.dialogRef.close("Yes");
  }

  /**
   * Cancel the deletion of a user account.
   * @returns void
   */
  onNo(): void {
    this.dialogRef.close("No");
  }
}
