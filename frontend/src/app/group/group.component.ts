import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Group } from '../models/group.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CardSelectorComponent } from '../dialogs/cardselector/cardselector.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements  OnInit {

  @Input() group: Group;



  @ViewChild('name') nameField: ElementRef;
  @Output()
  dropped = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<Group>();
  canEdit;


  mousePosition = {
    x: 0,
    y: 0
  };



  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
    if (this.group.title !== '') {
      this.canEdit = false;
    } else {
      this.canEdit = true;
    }
  }

  ngOnChanges() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CardSelectorComponent, {
      width: '800px'
    });

    // Wait for the user select card in the dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
      } else {
        this.group.cards.push(result);

      }


    });
  }

  check($event) {
    this.mousePosition.x = $event.screenX;
    this.mousePosition.y = $event.screenY;
  }

  editTitle($event) {
    this.group.selected = !this.group.selected;
    if (this.mousePosition.x === $event.screenX && this.mousePosition.y === $event.screenY) {
      // handle the real click event
      this.canEdit = true;
    }
  }

  saveTitle() {
    if (this.group.title !== '') {
      this.dropped.emit();
      this.canEdit = false;
    }
  }

  delete() {
    this.deleted.emit(this.group);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.dropped.emit();
  }
}
