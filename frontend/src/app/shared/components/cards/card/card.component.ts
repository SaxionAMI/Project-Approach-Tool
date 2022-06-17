import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Card } from "../../../../core/models/card.model";
import { MatDialog } from "@angular/material/dialog";
import { CardDetailModalComponent } from "../../dialogs/carddetail/card-detail-modal.component";
import { FormControl } from "@angular/forms";
import { SocketService } from "@app/core/services/socket.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  cardControl = new FormControl("", []);
  @Input() card: Card;
  @Input() room: string;
  canEdit = false;

  @Output() save = new EventEmitter<Card>();
  @Output() changeText = new EventEmitter<Card>();
  @Output() removeEffect = new EventEmitter();
  @Output() changedNote = new EventEmitter<string>();

  @ViewChild("question") QuestionField: ElementRef;

  constructor(public dialog: MatDialog, private socketService: SocketService) {}

  /**
   * set effect while typing a title.
   * @returns void
   */
  whileTyping(): void {
    this.changeText.emit(this.card);
  }

  /**
   * Open the detail dialog.
   * @returns void
   */
  openDetail(): void {
    this.socketService.setEffectOnCard(this.room, this.card);
    const dialogRef = this.dialog.open(CardDetailModalComponent, {
      width: "400px",
      data: this.card,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.socketService.removeEffectFromCard(this.room, this.card);
      if (this.card.title === "") {
        this.canEdit = true;
      }
      if (result !== undefined) {
        this.card.title = result;
        this.save.emit();
      }
      if (this.card.note !== undefined) {
        this.changedNote.emit();
      } else {
        this.changedNote.emit();
      }

      if (this.card.startDate == undefined) {
        this.card.startDate = new Date();
        this.card.endDate = new Date();
      }

      if (this.card.endDate == undefined) {
        this.card.startDate = new Date();
        this.card.endDate = new Date();
      }
    });
  }

  /**
   * Save the card title.
   * @returns void
   */
  saveTitle(): void {
    if (this.cardControl.value == '') {
      this.card.title = "Question";
    } else {
      this.card.title = this.cardControl.value;
    }
    this.save.emit(this.card);
    this.removeEffect.emit();
  }
}
