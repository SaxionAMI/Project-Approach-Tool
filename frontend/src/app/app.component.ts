import { Component, ViewChild, ElementRef, OnInit, Inject, HostListener, } from '@angular/core';
import { Group } from '../app/models/group.model';
import { Card } from './models/card.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragEnd
} from '@angular/cdk/drag-drop';
import { CardSelectorComponent } from './dialogs/cardselector/cardselector.component';
import { MatDialog } from '@angular/material/dialog';
import { Workspace } from './models/workspace.model';
import 'leader-line';
import { DOCUMENT } from '@angular/common';
import { TemplateselectorComponent } from './templateselector/templateselector.component';
import { TemplateService } from './services/template.service';
declare let LeaderLine: any;
import { MatSnackBar } from '@angular/material/snack-bar';
import html2canvas, * as html2Canvas from 'html2canvas';
import { PassworddialogComponent } from './dialogs/passworddialog/passworddialog.component';
import { CustomCardComponent } from './dialogs/customcard/customc-card/custom-card.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document,
    private templateService: TemplateService,
    private snackBar: MatSnackBar
  ) { }
  workspace: Workspace;
  canEditTitle = true;
  canEditGoal = true;
  drawing = false;
  connect: Group[] = [];
  click = 0;
  clickCheck: boolean = false;
  mouseTracker;
  trashCan: any[] = [];
  chooseGroupForQuestion = false;
  question: string;
  cards: Card[];
  lines: typeof LeaderLine[] = [];
  leaderLineOptions = {
    color: '#04abd6',
    size: 8
  };
  backspaceKeycode = 8;
  durationInSeconds = 5;
  firstSnackbarRef;
  secondSnackbarRef;

  tempLine;


  @ViewChild('sbtitle') subtitleElement: ElementRef;
  @ViewChild('leader-line') svgEl: ElementRef;
  @ViewChild('invisibleText') invTextER: ElementRef;
  @ViewChild('screen') screen: ElementRef;

  spawnList: Group = {
    id: Date.now(),
    title: 'spawngroup',
    location: { x: 0, y: 0 },
    cards: [],
    selected: false,
  };

  mouseLivePosition = {
    x: 0,
    y: 0
  }

  top = 0;
  left = 0;

  mousePositionForMovement = {
    x: 0,
    y: 0
  };

  ngOnInit(): void {
    if (localStorage.getItem('workspace') === null) {
      this.openTemplateModal();
      // open modal for choose a template
      this.workspace = new Workspace();
      this.workspace.groups = [];
      this.workspace.storedLines = [];
      this.lines = [];

    } else {
      this.workspace = JSON.parse(localStorage.getItem('workspace'));
      this.canEditTitle = false;
      this.canEditGoal = false;

      setTimeout(() => this.drawArrows());
    }
    this.mouseTracker = this.document.getElementById('mouseTracker');
  }




  // Listen to keyboard events
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    // if (event.keyCode === this.backspaceKeycode) {
    //   this.deleteGroup();
    // }
    // if (event.keyCode === 65) {
    //   this.addGroup();
    // }
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {

    this.top = event.y;
    this.left = event.x;
    
    if (this.tempLine) {
      this.tempLine.position();
    }
  }

  // Update the arrows when scrolling the workspace
  onScroll() {
    this.lines.forEach(line => {
      line.position();
    });
  }


  // Open the template modal and
  openTemplateModal() {
    const dialogRef = this.dialog.open(TemplateselectorComponent, {
      width: '800px'
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workspace = result;
        this.updateLocalStorage();
        console.log('choosen template: ' + result.title);
        window.location.reload();
      }
    });
  }

  AddCustomCard() {
    const dialogRef = this.dialog.open(CustomCardComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Save to localstrg
        const customCards = JSON.parse(localStorage.getItem('customCards')) || [];
        customCards.push(result);
        localStorage.setItem('customCards', JSON.stringify(customCards));
        // Add it do the spawnlist for convince
        this.spawnList.cards.push(result);
      }
    });
  }

  // delete group from the workspace and connecting lines as well
  deleteGroup(group) {
    if (this.workspace.storedLines.length === 0) {
      this.finalRemove(group);
    } else {
      for (const line of this.workspace.storedLines) {
        if (line.start === group.id || line.end === group.id) {
          for (let ln of this.lines) {
            if (ln._id === line.id) {
              ln.remove();
              this.workspace.storedLines = this.workspace.storedLines.filter(lnr => lnr.id !== ln._id);
              this.finalRemove(group);
            }
          }
        } else {
          this.finalRemove(group);
        }
      }
    }
  }

  finalRemove(group) {
    this.workspace.groups = this.workspace.groups.filter(gr => gr.id !== group.id);
    this.updateLocalStorage();
  }

  saveTemplate() {
    // Open password modal first
    const dialogRef = this.dialog.open(PassworddialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('this is called');

        html2canvas(this.document.getElementById('screen'), { allowTaint: true }).then(canvas => {
          var imgData = canvas.toDataURL("image/png");
          this.workspace.image = imgData;
          console.log(this.workspace);
          this.workspace.id = Date.now();

          this.templateService.postTemplate(this.workspace).subscribe();
        });
      }
    });
  }

  // Drawing already existing arrows after the HTML element are done, update the stored line id with current line id
  drawArrows() {
    for (let ln of this.workspace.storedLines) {
      const newline = new LeaderLine(
        this.document.getElementById(ln.start),
        this.document.getElementById(ln.end),
        this.leaderLineOptions
      );
      ln.id = newline._id;
      this.lines.push(newline);
    }
  }


  check($event) {
    this.mousePositionForMovement.x = $event.screenX;
    this.mousePositionForMovement.y = $event.screenY;
  }

  // Select or deselect a group
  select(group, $event) {
    if (group.selected) {
      group.selected = !group.selected;
    } else {
      // Remove the previously selected element
      this.workspace.groups.forEach(element => {
        element.selected = false;
      });
      if (this.mousePositionForMovement.x === $event.screenX && this.mousePositionForMovement.y === $event.screenY) {
        // handle the real click event
        group.selected = !group.selected;;
      }
    }

  }

  // Setting the drawing to true & show the snackbar with cancel button
  startArrow() {
    // Check if there is two phase in workspace if not show warning snackbar
    if (this.workspace.groups.length >= 2) {
      this.firstSnackbarRef = this.snackBar.open('Please select the first phase for the arrow!', 'Cancel');
      this.firstSnackbarRef.onAction().subscribe(() => {
        this.drawing = false;
      });
      this.drawing = true;
    } else {
      this.snackBar.open('An arrow requires two phases on the workspace!', 'ok', {
        duration: 3000
      });
    }
  }

  addArrow(group) {
    let line;
    if (this.click === 0) {
      // Add first group element to the temporarily array
      this.connect.push(group);
      // create temporarily line following the cursos
      this.tempLine = new LeaderLine(
        this.document.getElementById(group.id),
        this.mouseTracker,
        this.leaderLineOptions
      );

      // Dismiss first snackbar
      this.firstSnackbarRef.dismiss();
      // open second snackbar
      this.secondSnackbarRef = this.snackBar.open('Please connect the arrow to the second phase!', 'Cancel');
      this.secondSnackbarRef.onAction().subscribe(() => {
        this.drawing = false;
        this.tempLine.remove();
        this.click = 0;
        this.connect = [];
        this.tempLine = null;
      });
      this.click++;
    } else {
      this.secondSnackbarRef.dismiss();
      this.tempLine.remove();
      this.tempLine = null;
      this.connect.push(group);
      // tslint:disable-next-line: no-unused-expression
      line = new LeaderLine(
        this.document.getElementById(this.connect[0].id),
        this.document.getElementById(this.connect[1].id),
        this.leaderLineOptions
      );
      this.lines.push(line);

      this.workspace.storedLines.push({ id: line._id, start: this.connect[0].id, end: this.connect[1].id });

      this.click = 0;
      this.connect = [];
      this.drawing = false;

      this.updateLocalStorage();
    }
  }

  // Update line as group is being dragged in real time
  drag(group: Group) {
    this.workspace.storedLines.forEach(line => {
      if (line.start === group.id || line.end === group.id) {
        this.lines.forEach(ln => {
          if (ln._id === line.id) {
            ln.position();
          }
        });
      }
    });
  }

  // add new group to the workspace
  addGroup() {
    this.workspace.groups.push({
      id: Date.now(),
      title: '',
      location: { x: 32, y: 32 },
      cards: [],
      selected: false
    });
    this.updateLocalStorage();
  }

  // empty the whole workspace
  clearWorkspace() {
    localStorage.clear();
    this.workspace = new Workspace();
    this.workspace.groups = [];
    this.workspace.storedLines = [];
    this.canEditTitle = true;
    this.canEditGoal = true;

    this.spawnList.cards = [];

    for (const line of this.lines) {
      line.remove();
    }
    window.location.reload();

  }

  moveFocusToSubtitle() {
    if (!this.workspace.title) {
      console.log('this is called');

      this.workspace.title = 'Title';
    }
    this.canEditTitle = false;
    this.subtitleElement.nativeElement.focus();
    this.updateLocalStorage();
  }

  saveGoal() {
    if (!this.workspace.goal) {
      this.workspace.goal = 'Goal';
    }
    this.canEditGoal = false;
    this.updateLocalStorage();
  }

  openCardSelector(type) {
    const dialogRef = this.dialog.open(CardSelectorComponent, {
      width: '800px',
      data: { type }
    });

    // Wait for the user select card in the dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spawnList.cards.push(result);
      }
    });
  }

  addResearchQuestion() {
    this.spawnList.cards.push({
      Title: this.question,
      Type: 'Question'
    });
  }

  // Trashcan logic first move the item into trashcan array, check if has notes
  deleteTriggered(event: CdkDragDrop<string[]>) {
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

    // If the card has notes ask for confirmation
    if (this.trashCan[0].note != null) {
      console.log('Ask for notes');
    }
    this.trashCan = [];
  }

  // Save group location after the user moved it
  public onDragEnded(event: CdkDragEnd, group: Group): void {
    group.location = event.source.getFreeDragPosition();
    this.updateLocalStorage();
  }

  // When a card is dropped update localstorage and the arrow (timeout is needed to wait for the ui to render)
  cardDropped() {
    this.updateLocalStorage();
    setTimeout(() => this.updateArrows());
  }

  // update the arrows
  updateArrows() {
    this.lines.forEach(line => {
      line.position();
    });
  }

  updateLocalStorage() {
    localStorage.setItem('workspace', JSON.stringify(this.workspace));
  }
}
