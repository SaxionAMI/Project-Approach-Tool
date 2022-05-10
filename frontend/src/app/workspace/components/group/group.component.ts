import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from "@angular/core";
import { Group } from "../../../core/models/group.model";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { Position } from "../../../core/models/position.model";
import { Card } from "../../../core/models/card.model";
import { SocketService } from "@app/core/services/socket.service";
import { VTPrimaryAction } from "../../../core/models/virtual-teacher/actions/vt-primary-action";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"],
})
export class GroupComponent implements OnInit {
  @Input() group: Group;
  @Input() room: string;
  @ViewChild("name") nameField: ElementRef;
  @Output() dropped = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<Group>();
  @Output() title = new EventEmitter<string>();
  @Output() cardQuestion = new EventEmitter<Card>();
  @Output() swapped = new EventEmitter<{}>();
  @Output() changedNote = new EventEmitter<any>();

  canEdit: boolean;

  mousePosition: Position = { x: 0, y: 0 };

  constructor(public dialog: MatDialog, private socketService: SocketService) {}

  /**
   * This method will start on initializing.
   * @returns void
   */
  ngOnInit(): void {
    if (this.group.title !== "") {
      this.canEdit = false;
    } else {
      this.canEdit = true;
    }
  }

  /**
   * This sets the X and Y for the mouse
   * This is used by dragging the arrow
   * @param  {MouseEvent} event
   * @returns void
   */
  check(event: MouseEvent): void {
    this.mousePosition.x = event.screenX;
    this.mousePosition.y = event.screenY;
  }

  /**
   * edit a group title
   * @param  {MouseEvent} event - the click of a mouse
   * @returns void
   */
  editTitle(event: MouseEvent): void {
    this.group.selected = !this.group.selected;
    this.socketService.setEffectOnGroup(this.room, this.group);
    if (
      this.mousePosition.x === event.screenX &&
      this.mousePosition.y === event.screenY
    ) {
      // handle the real click event
      this.canEdit = true;
    }
  }

  /**
   * set effect on the card
   * @param  {Card} card - card object
   * @returns void
   */
  setEffectOnCard(card: Card): void {
    this.socketService.setEffectOnCard(this.room, card);
  }

  /**
   * save the group title
   * @returns void
   */
  saveTitle(): void {
    if (this.group.title !== "") {
      this.title.emit(this.group.title);
      this.canEdit = false;
      this.socketService.removeEffectFromGroup(this.room, this.group);
    }
  }

  /**
   * remove effect from a card
   * @param  {Card} card - the card object
   * @returns void
   */
  removeEffectFromCard(card: Card): void {
    this.socketService.removeEffectFromCard(this.room, card);
  }

  /**
   * delete the group
   * @returns void
   */
  delete(): void {
    this.deleted.emit(this.group);
  }

  /**
   * drop a card into the group
   * @param  {CdkDragDrop<Card[]>} event - the dropping card event
   * @returns void
   */
  drop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.swapped.emit({
        groupId: event.container.id,
        oldIndex: event.previousIndex,
        newIndex: event.currentIndex,
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const cardIdFromGroupCard = event.item.element.nativeElement.id;
      const cardIdFromSpawnlistCard =
        event.item.element.nativeElement.children[0].id;
      const cardId =
        cardIdFromGroupCard !== ""
          ? cardIdFromGroupCard
          : cardIdFromSpawnlistCard;
      this.dropped.emit({
        cardId,
        newGroupId: event.container.id,
        oldGroupId: event.previousContainer.id,
        newIndex: event.currentIndex,
        oldIndex: event.previousIndex,
      });
    }
  }

  /**
   * save the card question
   * @param  {Card} card - the card object
   * @returns void
   */
  saveCardQuestionTitle(card: Card): void {
    this.cardQuestion.emit(card);
    this.socketService.removeEffectFromCard(this.room, card);
  }

  /**
   * updating the note in card
   * @param  {Card} card - the card object
   * @returns void
   */
  updateNoteInCard(card: Card): void {
    this.changedNote.emit({ card, groupId: this.group.id });
  }

  /**
   * while dragging a card an effect is set
   * @param  {Card} card - the card object
   * @returns void
   */
  onDragCard(card: Card): void {
    this.socketService.setEffectOnCard(this.room, card);
  }

  /**
   * when the dragging of a card ends, the effect is removed
   * @param  {Card} card - the card object
   * @returns void
   */
  onDragCardEnded(card: Card): void {
    this.socketService.removeEffectFromCard(this.room, card);
  }


  onFeedbackClicked(feedbacks: VTPrimaryAction[]) {
    if (feedbacks.length > 0) {
      feedbacks[0].perform();
    }
  }
}
