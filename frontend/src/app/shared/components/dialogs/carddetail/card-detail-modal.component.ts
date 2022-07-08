import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Card } from "src/app/core/models/card.model";
import { GroupComponent } from "src/app/workspace/components/group/group.component";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-card-detail-modal",
  templateUrl: "./card-detail-modal.component.html",
  styleUrls: ["./card-detail-modal.component.css"],
})
export class CardDetailModalComponent implements OnInit {
  titleControl = new FormControl("", []);
  question: boolean = false;
  canEdit: boolean = false;

  @ViewChild("title-editor") vc: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<GroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private cd: ChangeDetectorRef
  ) {}

  /**
   * This method will start on initializing.
   * @returns void
   */
  ngOnInit(): void {
    if (this.data.type === "Question") {
      this.question = true;
      this.titleControl.setValue(this.data.title);
    }
  }

  /**
   * Change the edit state.
   * @returns void
   */
  changeEdit(): void {
    this.canEdit = true;
    this.cd.detectChanges();
  }

  /**
   * Save the card title.
   * @returns void
   */
  saveTitle(): void {
    if (this.titleControl.value !== "") {
      this.data.title = this.titleControl.value;
    }
    this.dialogRef.close(this.data.title);
  }

  /**
   * Close the dialog.
   * @returns void
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
