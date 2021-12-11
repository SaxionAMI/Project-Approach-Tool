import { Component, Inject } from "@angular/core";
import { InviteDialogComponent } from "../invite-dialog/invite-dialog.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-delete-invite",
  templateUrl: "./confirm-delete-invite.component.html",
  styleUrls: ["./confirm-delete-invite.component.css"],
})
export class ConfirmDeleteInviteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InviteDialogComponent>
  ) {}

  /**
   * Cancel the revokation of the access of a user.
   * @returns void
   */
  onBack(): void {
    this.dialogRef.close(null);
  }

  /**
   * Confirm the revokation of the access of a user.
   * @returns void
   */
  onConfirm(): void {
    this.dialogRef.close(this.data);
  }
}
