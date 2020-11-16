import { Component } from "@angular/core";
import { Card } from "src/app/models/card.model";
import { AppComponent } from "src/app/app.component";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-custom-card",
  templateUrl: "./custom-card.component.html",
  styleUrls: ["./custom-card.component.css"],
})
export class CustomCardComponent {
  card: Card = new Card();
  color: string = "#ff0000";
  submitted: boolean = false;

  constructor(private dialogRef: MatDialogRef<AppComponent>) {}

  /**
   * Submit a custom card.
   * @returns void
   */
  onSubmit(): void {
    this.submitted = true;
  }

  /**
   * Close the dialog and save the card.
   * @returns void
   */
  save(): void {
    this.dialogRef.close(this.card);
  }

  /**
   * Close the dialog.
   * @returns void
   */
  close(): void {
    this.dialogRef.close();
  }
}
