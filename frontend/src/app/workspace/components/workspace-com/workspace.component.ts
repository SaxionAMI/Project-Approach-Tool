import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Inject,
  HostListener,
} from "@angular/core";
import { Group } from "../../../core/models/group.model";
import { Card } from "../../../core/models/card.model";
import { CdkDragEnd } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { Workspace } from "../../../core/models/workspace.model";
//import { LeaderLine } from "leader-line";
import { DOCUMENT } from "@angular/common";
//declare let LeaderLine: any;
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from "@angular/material/snack-bar";
import html2canvas from "html2canvas";
import { Position } from "../../../core/models/position.model";
import { workspaceConfig } from "../../../core/models/workspaceConfig.model";
import { WorkspaceService } from "@app/workspace/services/workspace.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PlatformLocation } from "@angular/common";
import { AuthService } from "@app/auth/services/auth.service";
import { SocketService } from "@app/core/services/socket.service";
import { CardService } from "@app/workspace/services/card.service";
import { DeckdialogComponent } from "../../../shared/components/dialogs/deckdialog/deckdialog.component";
import { JoyrideService } from "ngx-joyride";
import { MatMenuTrigger } from "@angular/material/menu";
import { User } from "../../../core/models/user.model";
import { VTActionOpenCatalog } from "../../../core/models/virtual-teacher/actions/secondary/vt-action-open-catalog";
import { VTActionOpenSearch } from "../../../core/models/virtual-teacher/actions/secondary/vt-action-open-search";
import { VTCatalogActionService } from "../../services/virtual-teacher/vt-catalog-action/vt-catalog-action.service";
import { VTWorkspaceData } from "../../../core/models/virtual-teacher/workspace-data/VTWorkspaceData";
import LeaderLine from "leader-line-new";

@Component({
  selector: "app-workspace",
  templateUrl: "./workspace.component.html",
  styleUrls: ["./workspace.component.css"],
})
export class WorkspaceComponent implements OnInit {
  workspace: Workspace = Workspace.blank();
  workspaceConfig: workspaceConfig = new workspaceConfig();
  connect: Group[] = [];
  mouseTracker: any;
  trashCan: any[] = [];
  cards: Card[];
  //lines: typeof LeaderLine[] = [];
  lines: LeaderLineWithId[] = [];
  firstSnackbarRef: MatSnackBarRef<SimpleSnackBar>;
  secondSnackbarRef: MatSnackBarRef<SimpleSnackBar>;
  tempLine: LeaderLine;
  loading: boolean = true;
  styling: string = "";
  type: string = "workspace";
  room: string = this.route.snapshot.params.id;
  isShowing: boolean = false;
  categorySelected: string = "";
  preloadedCardsOfAllDecks: Card[] = [];
  cardsOfSelectedDeck: Card[] = [];
  checkIfCardContextMenu: boolean = false;

  @ViewChild("sbtitle") subtitleElement: ElementRef;
  @ViewChild("leader-line") svgEl: ElementRef;
  @ViewChild("invisibleText") invTextER: ElementRef;
  @ViewChild("screen") screen: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: "0px", y: "0px" };
  mousePositionForMovement: Position = { x: 0, y: 0 };
  mouseLivePosition: Position = { x: 0, y: 0 };

  searchPhrase: string = '';

  get cardsMatchingSearchPhrase() {
    if (this.categorySelected === 'Search') {
      if (!this.searchPhrase || this.searchPhrase.length == 0) return [];
      else return this.cardsOfSelectedDeck.filter(x => x.title.includes(this.searchPhrase));
    }
    else return [];
  }

  constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document,
    private workspaceService: WorkspaceService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public location: PlatformLocation,
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router,
    private cardService: CardService,
    private joyrideService: JoyrideService,
    private vtCatalogService: VTCatalogActionService
  ) {
    location.onPopState(() => {
      this.removeArrows();

      this.socketService.leaveRoom(this.room);
    });
  }

  /**
   * This method will start on initializing.
   * It contains most socket observers and the start of the second part of the onboarding tour.
   * @returns void
   */
  ngOnInit(): void {
    this.vtCatalogService.openCatalogTab.subscribe(x => this.openCatalog(x));
    this.vtCatalogService.openSearchTab.subscribe(x => this.openSearch(x));

    this.loading = false;
    if (localStorage.getItem("ActiveOnboardingWorkspace") === "true") {
      this.joyrideService
        .startTour({
          steps: [
            "step6@workspace/" + this.room,
            "step7@workspace/" + this.room,
            "step8@workspace/" + this.room,
            "step9@workspace/" + this.room,
            "step10@workspace/" + this.room,
            "step11@workspace/" + this.room,
            "step12@workspace/" + this.room,
            "step13@workspace/" + this.room,
            "step14@workspace/" + this.room,
            "step15@workspace/" + this.room,
            "step16@workspace/" + this.room,
            "step17@workspace/" + this.room,
            "step18@workspace/" + this.room,
            "step19@workspace/" + this.room,
            "step20@workspace/" + this.room,
            "step21@workspace/" + this.room,
            "step22@workspace/" + this.room,
          ],
        })
        .subscribe(
          (steps) => {},
          (error) => {},
          () => {
            localStorage.removeItem("ActiveOnboardingWorkspace");
          }
        );
    }

    this.authService.getUserUID().then((uid) => {
      this.socketService.connectSocketToRoom(this.room, uid);
    });

    this.socketService.on("moveGroup").subscribe(async (res) => {
      this.workspace.groups.find((group) => group.id === res.id).location =
        res.location;
      this.updateArrows();
    });

    this.socketService.on('rejoinRoomIfAny').subscribe(() => {
      this.authService.getUserUID().then((uid) => {
        this.socketService.connectSocketToRoom(this.room, uid);
      });
    })

    this.socketService.on("updateGroupTitle").subscribe((res) => {
      this.workspace.groups.find((group) => group.id === res.id).title =
        res.title;
    });

    this.socketService.on("updateWorkspaceTitle").subscribe((res) => {
      this.workspace.title = res;
    });

    this.socketService.on("updateWorkspaceGoal").subscribe((res) => {
      this.workspace.goal = res;
    });

    this.socketService.on("addCardToSpawnlist").subscribe((res) => {
      this.workspace.spawnList.cards.push(new Card(res));
    });

    this.socketService.on("moveCardToGroup").subscribe(async (res) => {

      const spawnlist = this.workspace.spawnList;
      const newGroup = this.workspace.groups.find(
        (group) => group.id === Number(res.newGroupId)
      );
      const oldGroup = this.workspace.groups.find(
        (group) => group.id === Number(res.oldGroupId)
      );

      if (Number(res.oldGroupId) === spawnlist.id) {
        const card = spawnlist.cards[res.oldIndex];
        spawnlist.cards.splice(res.oldIndex, 1);
        newGroup.cards.splice(res.newIndex, 0, card);
        this.updateArrows();
      } else {
        const card = oldGroup.cards[res.oldIndex];
        oldGroup.cards.splice(res.oldIndex, 1);
        newGroup.cards.splice(res.newIndex, 0, card);
        this.updateArrows();
      }
    });

    this.socketService.on("addGroupToWorkspace").subscribe((res) => {
      this.workspace.groups.push(new Group(res));
    });

    this.socketService.on("addArrowToWorkspace").subscribe((res) => {
      this.workspace.storedLines.push(res);
      this.drawArrows();
    });

    this.socketService.on("addQuestionToWorkspace").subscribe((res) => {
      this.workspace.spawnList.cards.push(new Card(res));
    });

    this.socketService.on("updateQuestionInGroup").subscribe((res) => {
      console.log(res);
      this.workspace.groups.forEach((group) => {
        console.log(group);
        if (group.cards.find((card) => card.id === res.id)) {
          group.cards.find((card) => card.id === res.id).title = res.title;
        }
      });
      this.updateArrows();
    });

    this.socketService.on("updateQuestionInSpawnlist").subscribe((res) => {
      this.workspace.spawnList.cards.find((card) => card.id === res.id).title =
        res.title;
    });

    this.socketService.on("updateCardPositionWithinGroup").subscribe((res) => {
      const cards = this.workspace.groups.find(
        (group) => group.id === Number(res.groupId)
      ).cards;
      const card = cards.splice(res.oldIndex, 1);
      cards.splice(res.newIndex, 0, card[0]);
      this.updateWorkspace();
    });

    this.socketService.on("removeCardFromGroup").subscribe(async (res) => {
      const group = this.workspace.groups.find(
        (group) => group.id === Number(res.groupId)
      );
      group.cards.splice(res.cardIndex, 1);
      this.updateArrows();
    });

    this.socketService.on("removeCardFromSpawnlist").subscribe((res) => {
      const spawnlist = this.workspace.spawnList;
      spawnlist.cards.splice(res.cardIndex, 1);
    });

    this.socketService.on("updateNoteInSpawnlistCard").subscribe((res) => {
      if (res.hasOwnProperty("id")) {
        this.workspace.spawnList.cards.find((card) => card.id === res.id).note =
          res.note;
      } else if (res.hasOwnProperty("_id")) {
        this.workspace.spawnList.cards.find(
          (card) => card._id === res._id
        ).note = res.note;
      }
    });

    this.socketService.on("updateNoteInGroupCard").subscribe((res) => {
      if (this.workspace.groups.find((group) => group.id === res.groupId)) {
        const group = this.workspace.groups.find(
          (group) => group.id === Number(res.groupId)
        );
        if (res.card.hasOwnProperty("id")) {
          group.cards.find((card) => card.id === res.card.id).note =
            res.card.note;
        } else if (res.card.hasOwnProperty("_id")) {
          group.cards.find((card) => card._id === res.card._id).note =
            res.card.note;
        }
      }
    });

    this.socketService.on("setEffectOnGroup").subscribe((res) => {
      const el = document.getElementById(res.group.id);
      el.style.boxShadow = res.color + " 0px 0px 15px";
    });

    this.socketService.on("removeEffectFromGroup").subscribe((res) => {
      const el = document.getElementById(res.id);
      el.style.boxShadow = "none";
    });

    this.socketService.on("setEffectOnCard").subscribe((res) => {
      const id = res.card.id ? res.card.id : res.card._id;
      const el = document.getElementById(id);
      el.style.boxShadow = res.color + " 0px 0px 15px";
    });

    this.socketService.on("removeEffectFromCard").subscribe((res) => {
      const id = res.id ? res.id : res._id;
      const el = document.getElementById(id);
      el.style.boxShadow = "none";
    });

    this.socketService.on("removeGroup").subscribe((res) => {
      for (const line of this.workspace.storedLines) {
        if (line.start === res.id || line.end === res.id) {
          for (const ln of this.lines) {
            if (ln.id == line.id) {
              ln.line.remove();
              this.workspace.storedLines = this.workspace.storedLines.filter(
                (lnr) => lnr.id !== ln.id
              );
            }
          }
        }
      }
      this.workspace.groups = this.workspace.groups.filter(
        (gr) => gr.id !== res.id
      );
    });

    this.lines = [];
    this.workspaceService
      .getWorkspaceById(this.route.snapshot.params.id)
      .subscribe(async (res) => {
        this.workspace = new Workspace(res);
        this.loading = false;
        await this.delay(500);
        this.drawArrows();
        if (this.workspace.decks.length === 0) {
          this.openDeckSettings();
        }
        this.getCardsbyDeck();
      });
    this.workspaceConfig.canEditTitle = false;
    this.workspaceConfig.canEditGoal = false;
    this.mouseTracker = this.document.getElementById("mouseTracker");

    const scrollContent = document.getElementById("content");
    if (scrollContent) {
      scrollContent.addEventListener("scroll", () => {
        this.updateArrows();
      });
    }
  }

  /**
   * this method is used while placing arrows.
   * @param  {} ["$event"]
   * @param  {MouseEvent} event - this is the event coming from mouse movement.
   * @returns void
   */
  @HostListener("mousemove", ["$event"])
  onMousemove(event: MouseEvent): void {
    this.workspaceConfig.top = event.y;
    this.workspaceConfig.left = event.x;
    if (this.tempLine) {
      this.tempLine.position();
    }
  }

  /**
   * this method is used to update the active userlist when a user leaves by closing the page.
   * @returns void
   */
  @HostListener("window:unload")
  unloadHandler(): void {
    this.socketService.leaveRoom(this.room);
  }

  /**
   * this method repositions the arrows when scrolling the workspace
   * @returns void
   */
  onScroll(): void {
    this.updateArrows();
  }

  /**
   * this method repositions the arrows when scrolling the workspace
   * @returns void
   */
   onResized(): void {
    this.updateArrows();
  }

  /**
   * This method is used when a custom card is created
   * @param  {any} result
   * @returns void
   * TODO: implement custom cards again into the workspace.
   */
  onCustomCard(result: any): void {
    result.id = Date.now().toString();
    this.workspace.customCards.push(new Card(result));
    this.workspace.spawnList.cards.push(new Card(result));
    this.updateWorkspace();
    this.socketService.addCardToSpawnlist(this.room, new Card(result), new VTWorkspaceData(this.workspace));
  }

  /**
   * Drawing already existing arrows after the HTML element are done,
   * update the stored line id with current line id.
   * @returns void
   */
  drawArrows(): void {
    this.workspace.storedLines.forEach((line) => {
      const start = this.document.getElementById(line.start);
      const end = this.document.getElementById(line.end);
      if (!start || !end) {
        const index = this.workspace.storedLines.indexOf(line);
        this.workspace.storedLines.splice(index, 1);
      }
      else {
        const newline = new LeaderLine(start, end, this.workspaceConfig.leaderLineOptions);
        this.lines.push(new LeaderLineWithId(line.id, newline));
      }
    });
  }

  /**
   * This sets the X and Y for the mouse
   * This is used by dragging the arrow
   * @param  {MouseEvent} event
   * @returns void
   */
  check(event: MouseEvent): void {
    this.mousePositionForMovement.x = event.screenX;
    this.mousePositionForMovement.y = event.screenY;
  }

  /**
   * Select or deselect a group
   * @param  {Group} group
   * @param  {MouseEvent} event
   * @returns void
   */
  select(group: Group, event: MouseEvent): void {
    if (group.selected) {
      group.selected = !group.selected;
    } else {
      // Remove the previously selected element
      this.workspace.groups.forEach((element) => {
        element.selected = false;
      });
      if (
        this.mousePositionForMovement.x === event.screenX &&
        this.mousePositionForMovement.y === event.screenY
      ) {
        // handle the real click event
        group.selected = !group.selected;
      }
    }
  }

  /**
   * This is the first step in setting a arrow
   * @returns void
   * @deprecated
   */
  startArrow(): void {
    // Check if there is two phase in workspace if not show warning snackbar
    if (this.workspace.groups.length >= 2) {
      this.firstSnackbarRef = this.snackBar.open(
        "Please select the first phase for the arrow!",
        "Cancel"
      );
      this.firstSnackbarRef.onAction().subscribe(() => {
        this.workspaceConfig.drawing = false;
      });
      this.workspaceConfig.drawing = true;
    } else {
      this.snackBar.open(
        "An arrow requires two phases on the workspace!",
        "ok",
        {
          duration: 3000,
        }
      );
    }
  }

  /**
   * this method is used to set the arrows on the workspace.
   * @param  {Group} group
   * @returns void
   */
  addArrow(group: Group): void {
    let line: LeaderLineWithId;
    if (this.workspaceConfig.click === 0) {
      // Add first group element to the temporarily array
      this.connect.push(group);
      // create temporarily line following the cursos
      this.tempLine = new LeaderLine(
        this.document.getElementById(group.id),
        this.mouseTracker,
        this.workspaceConfig.leaderLineOptions
      );
      // Dismiss first snackbar
      this.firstSnackbarRef.dismiss();
      // open second snackbar
      this.secondSnackbarRef = this.snackBar.open(
        "Please connect the arrow to the second phase!",
        "Cancel"
      );
      this.secondSnackbarRef.onAction().subscribe(() => {
        this.workspaceConfig.drawing = false;
        this.tempLine.remove();
        this.workspaceConfig.click = 0;
        this.connect = [];
        this.tempLine = null;
      });
      this.workspaceConfig.click++;
    } else {
      this.secondSnackbarRef.dismiss();
      this.tempLine.remove();
      this.tempLine = null;
      this.connect.push(group);
      // tslint:disable-next-line: no-unused-expression
      let newLineId = this.workspace.storedLines.length;
      while(this.workspace.storedLines.find(x => x.id == newLineId)) {
        newLineId++;
      }
      //todo assign line number
      line = new LeaderLineWithId(
        newLineId, new LeaderLine(
          this.document.getElementById(this.connect[0].id),
          this.document.getElementById(this.connect[1].id),
          this.workspaceConfig.leaderLineOptions
        )
      );
      this.lines.push(line);
      const newLine = {
        id: line.id,
        start: this.connect[0].id,
        end: this.connect[1].id,
      };
      this.workspace.storedLines.push(newLine);
      this.socketService.addArrowToWorkspace(this.room, newLine, new VTWorkspaceData(this.workspace));

      this.workspaceConfig.click = 0;
      this.connect = [];
      this.workspaceConfig.drawing = false;

      this.updateWorkspace();
    }
  }

  /**
   * Reposition the line as group is being dragged in real time
   * @param  {Group} group
   * @returns void
   */
  drag(group: Group): void {
    this.workspace.storedLines.forEach((line) => {
      if (line.start === group.id || line.end === group.id) {
        this.lines.forEach((ln) => {
          if (ln.id === line.id) {
            ln.line.position();
          }
        });
      }
    });
  }

  /**
   * Add new group to the workspace
   * @returns void
   */
  addGroup(): void {
    const group = new Group({
      id: Date.now(),
      title: "title",
      location: { x: 600, y: 500 },
      cards: [],
      selected: false
    });
    this.workspace.groups.push(group);
    this.updateWorkspace();
    this.socketService.addGroupToWorkspace(this.room, group, new VTWorkspaceData(this.workspace));
  }

  /**
   * makes it possible to change the title of a workspace
   * @returns void
   */
  moveFocusToSubtitle(): void {
    if (this.workspace.title === "") {
      this.workspace.title = "Title";
    }
    this.workspaceConfig.canEditTitle = false;
    this.updateWorkspace();
    this.socketService.removeEffectFromTitle(this.room);
    this.socketService.updateWorkspaceTitle(this.room, this.workspace.title, new VTWorkspaceData(this.workspace));
  }

  /**
   * makes it possible to change the goal of a workspace
   * @returns void
   */
  saveGoal(): void {
    if (!this.workspace.goal) {
      this.workspace.goal = "Goal";
    }
    this.workspaceConfig.canEditGoal = false;
    this.socketService.removeEffectFromGoal(this.room);
    this.socketService.updateWorkspaceGoal(this.room, this.workspace.goal, new VTWorkspaceData(this.workspace));
    this.updateWorkspace();
  }

  /**
   * Add a card to the spawnlist in a workspace.
   * @param  {Card} card - this is the card object
   * @returns void
   */
  addCard(card: Card): void {
    this.workspace.spawnList.cards.push(new Card(card));
    card.id = Date.now().toString();
    this.updateWorkspace();
    this.socketService.addCardToSpawnlist(this.room, card, new VTWorkspaceData(this.workspace));
  }

  /**
   * remove all arrows from the workspace.
   * This is method is mostly used when going back to another workspace or logging out.
   * @returns void
   */
  removeArrows(): void {
    for (const line of this.lines) {
      line.line.remove();
    }
  }

  /**
   * This method adds a research question to the spawnlist.
   * @returns void
   */
  addResearchQuestion(): void {
    const question = new Card({
      type: "Question",
      id: Date.now().toString(),
      title: "",
      feedback: undefined,
    });
    this.workspace.spawnList.cards.push(question);
    this.updateWorkspace();
    this.socketService.addQuestionToWorkspace(this.room, question, new VTWorkspaceData(this.workspace));
  }

  /**
   * Saves group location after the user moved it
   * @param  {CdkDragEnd} event - this is the event from ending a drag
   * @param  {Group} group - this is a group object
   */
  onDragEnded(event: CdkDragEnd, group: Group) {
    console.log('On drag ended')
    const x = Math.round(event.source.getFreeDragPosition().x / 100) * 100;
    const y = Math.round(event.source.getFreeDragPosition().y / 100) * 100;
    group.location = { x, y };
    console.log(group);
    this.socketService.removeEffectFromGroup(this.room, group);
    this.socketService.moveGroup(this.room, group, new VTWorkspaceData(this.workspace));

    this.updateArrows();
    this.updateWorkspace();
  }

  /**
   * When a card is dropped update localstorage and the
   * arrow (timeout is needed to wait for the ui to render)
   * @param  {any} value
   * @returns void
   */
  cardDropped(value: any): void {
    console.log(value);
    this.socketService.moveCardToGroup(this.room, new Card(value), new VTWorkspaceData(this.workspace));
    this.updateWorkspace();
    setTimeout(() => this.updateArrows());
  }

  private lastCalled: Date;
  /**
   * this updates the position of each arrow.
   */
  updateArrows() {
    const now = new Date();
    if (this.lastCalled && (now.getTime() - this.lastCalled.getTime()) < 10) {
      return;
    }
    this.lastCalled = new Date();
    //await this.delay(0);
    this.lines.forEach((line) => {
      line.line.position();
    });
  }

  /**
   * this upserts the workspace
   * @returns void
   */
  updateWorkspace(): void {
    console.log('On drag ended')
    html2canvas(this.document.getElementById("screen"), {
      allowTaint: true,
      useCORS: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      this.workspace.image = imgData;
    })
    .catch(error => {
      console.error('caught error during html2canvas render: ' + error);
    })
    .finally(() => {
      this.workspaceService.upsertWorkspaceById(this.workspace).subscribe();
    });
  }

  /**
   * this adds a waited delay as a sleep function
   * @param  {number} ms - amount of ms to wait
   * @returns Promise - returns a promise to resolve
   */
  delay(ms: number): Promise<number> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Remove the arrows and log out
   * @returns void
   */
  onLogout(): void {
    this.removeArrows();
    this.authService.logout();
  }

  /**
   * Change the title of a group object
   * @param  {Group} group - the group object
   * @returns void
   */
  changeGroupTitle(group: Group): void {
    this.socketService.updateGroupTitle(this.room, group, new VTWorkspaceData(this.workspace));
  }

  /**
   * Save the question of a card within a group
   * @param  {Card} card - the question card
   * @returns void
   */
  saveCardQuestionTitle(card: Card): void {
    console.log(card);
    this.socketService.updateQuestionInGroup(this.room, card, new VTWorkspaceData(this.workspace));
    this.updateWorkspace();
  }

  /**
   * Swap the position of cards in a group
   * @param  {[]} cards - an array of cards and new positions
   * @returns void
   */
  swapCardPositionWithinGroup(cards: []): void {
    this.socketService.updateCardPositionWithinGroup(this.room, cards, new VTWorkspaceData(this.workspace));
    this.updateWorkspace();
  }

  /**
   * Save the question of a card within a spawnlist
   * @param  {Card} card - the question card
   * @returns void
   */
  saveCardQuestionTitleInSpawnlist(card: Card): void {
    this.socketService.removeEffectFromCard(this.room, card);
    this.socketService.updateQuestionInSpawnlist(this.room, card, new VTWorkspaceData(this.workspace));
    this.updateWorkspace();
  }

  /**
   * Set the effect of another use on the card
   * @param  {Any} effect - the effect to set on a card
   * @returns void
   */
  setEffectOnCardInSpawnlist(effect: any): void {
    this.socketService.setEffectOnCard(this.room, effect);
  }

  /**
   * Adapt the note of a card within the spawnlist
   * @param  {Card} card - the card object
   * @returns void
   */
  changeNoteInSpawnlist(card: Card): void {
    this.socketService.updateNoteInSpawnlistCard(this.room, card, new VTWorkspaceData(this.workspace));
    this.updateWorkspace();
  }

  /**
   * Adapt the note of a card within a group
   * @param  {Card} card - the card object
   * @returns void
   */
  changeNoteInGroup(card: Card): void {
    console.log(card);

    this.socketService.updateNoteInGroupCard(this.room, card, new VTWorkspaceData(this.workspace));
    this.updateWorkspace();
  }

  /**
   * This method is used to add invited users to a workspace as "invited"
   * @param  {any} invite - the invitees
   * @returns void
   */
  onUserInvite(invite: any): void {
    if (invite) {
      invite.users.forEach((user) => {
        this.workspace.users.push({ email: user });
        this.updateWorkspace();
      });
    }
  }

  /**
   * When dragging a group, an effect is set for other users.
   * @param  {Group} group
   * @returns void
   */
  onDrag(group: Group): void {
    this.socketService.setEffectOnGroup(this.room, group);
  }

  /**
   * When dragging a card, an effect is set for other users.
   * @param  {Card} card
   * @returns void
   */
  onDragCard(card: Card): void {
    console.log(card.id);
    this.socketService.setEffectOnCard(this.room, card);
  }

  /**
   * When dragging of a card end, an effect is removed for other users.
   * @param  {Card} card
   * @returns void
   */
  onDragCardEnded(card: Card): void {
    this.socketService.removeEffectFromCard(this.room, card);
  }

  /**
   * Revoking the access of users
   * @param  {User} user
   * @returns void
   */
  onRevokeAccesForUser(user: User): void {
    if (user.hasOwnProperty("email")) {
      const index = this.workspace.users.findIndex(
        (u) => u.email === user.email
      );
      this.workspace.users.splice(index, 1);
      this.updateWorkspace();
    } else {
      const index = this.workspace.users.findIndex((u) => u.uid === user.uid);
      this.workspace.users.splice(index, 1);
      this.updateWorkspace();
    }
  }

  async searchCards() {
    if (this.searchPhrase && this.searchPhrase.length > 0) {
      const limit = 10;
      const toSearchFor = this.preloadedCardsOfAllDecks.filter(x => {
        return x.title.toLowerCase().includes(this.searchPhrase.toLowerCase())
      });
      const cards = []
      this.cardsOfSelectedDeck = [];
      for(let i = 0; i < limit && i < toSearchFor.length; i++) {
        const card = toSearchFor[i]
        cards.push(card);
      }
      this.cardsOfSelectedDeck = cards.sort((a, b) => {
        if (a.type < b.type) return -1;
        else if (b.type < a.type) return 1;
        else if (a.title < b.title) return -1;
        else if (b.title < a.title) return 1;
        else return 0;
      })
    }
    else {
      this.cardsOfSelectedDeck = [];
    }
  }

  /**
   * This toggles the sidebar open or closed.
   * @param  {string} category - the category to open
   * @returns Promise - returns a promise because it is an async method
   */
  async toggleSidebar(category: string): Promise<void> {
    if (category === 'Search') {
      if (category === this.categorySelected) {
        this.isShowing = false;
        this.cardsOfSelectedDeck = [];
        var temp = 0;
        var tempCard = this.preloadedCardsOfAllDecks[0];
        this.preloadedCardsOfAllDecks.forEach((card) => {
          const thisDate =  Date.now().toString();
          if (tempCard != card) {
            temp += 1;
          }

          if (card.type === category) {
            card.id = thisDate + temp;
            this.cardsOfSelectedDeck.push(new Card(card));
          }
        });
        this.categorySelected = "";
        this.repeatUpdate();
      }
      else {
        this.categorySelected = category;
        this.isShowing = true;
        this.cardsOfSelectedDeck = [];
        this.repeatUpdate();
      }
    }
    else if (category !== "general") {
      if (category === this.categorySelected && category !== "general") {
        this.isShowing = false;
        this.cardsOfSelectedDeck = [];
        var temp = 0;
        var tempCard = this.preloadedCardsOfAllDecks[0];
        this.preloadedCardsOfAllDecks.forEach((card) => {
          const thisDate =  Date.now().toString();
          if (tempCard != card) {
            temp += 1;
          }

          if (card.type === category) {
            card.id = thisDate + temp;
            this.cardsOfSelectedDeck.push(new Card(card));
          }
        });
        this.categorySelected = "";
        this.repeatUpdate();
      } else { // TODO:1: The cards are shown when entering this. 
        this.categorySelected = category;
        this.isShowing = true;
        this.cardsOfSelectedDeck = [];
        var temp = 0;
        var tempCard = this.preloadedCardsOfAllDecks[0];
        this.preloadedCardsOfAllDecks.forEach((card) => {
          const thisDate =  Date.now().toString();
          if (tempCard != card) {
            temp += 1;
          }

          if (card.type === category) {
            card.id = thisDate + temp;
            this.cardsOfSelectedDeck.push(new Card(card));
          }
        });
        this.repeatUpdate();
      }
    } else {
      if (this.categorySelected === "") {
        this.categorySelected = category;
        this.isShowing = true;
        this.repeatUpdate();
      } else if (
        this.categorySelected !== "" &&
        this.categorySelected !== "general"
      ) {
        this.categorySelected = category;
        this.cardsOfSelectedDeck = [];
        this.isShowing = true;
        this.repeatUpdate();
      } else {
        this.categorySelected = "";
        this.cardsOfSelectedDeck = [];
        this.isShowing = false;
        this.repeatUpdate();
      }
    }
  }

  private onSearchChanged() {
    if (this.categorySelected === 'Search') {

    }
  }

  /**
   * repeat updating the cards when opening the sidebar
   * @returns void
   */
  repeatUpdate(): void {
    for (let i = 0; i < 3000; i++) {
      this.updateArrows();
    }
  }

  /**
   * This method will remove the effect from card for other users.
   * @param  {Card} card - the card object
   * @returns void
   */
  removeEffectFromCard(card: Card): void {
    this.socketService.removeEffectFromCard(this.room, card);
  }

  /**
   * when going back to the workspaces list
   * @returns void
   */
  onBack(): void {
    this.removeArrows();
    this.router.navigate(["workspaces"]);
    this.socketService.leaveRoom(this.workspace._id);
  }

  /**
   * Opening the deck settings dialog
   * @returns void
   */
  openDeckSettings(): void {
    const dialogRef = this.dialog.open(DeckdialogComponent, {
      disableClose: true,
      width: "400px",
      data: this.workspace,
    });

    dialogRef.afterClosed().subscribe((decks) => {
      if (decks !== "" && decks !== undefined) {
        this.workspace.decks = decks;
        this.updateWorkspace();
        this.getCardsbyDeck();
      }
    });
  }

  /**
   * Get all cards by decks and adding them to the preloadedCards array
   * @returns void
   */
  getCardsbyDeck(): void {
    this.workspace.decks.forEach((deck) => {
      this.cardService.getCardsByDeck(deck.title).subscribe((cards) => {
        cards.forEach((card) => {
          if (deck.types.includes(card.type)) {
            if (
              !this.preloadedCardsOfAllDecks.find(
                (preloadCard) => preloadCard.title === card.title
              )
            ) {
              this.preloadedCardsOfAllDecks.push(card);
            }
          }
        });
      });
    });
  }

  /**
   * This is used to create the sidebar dynamic when it comes to the buttons
   * @param  {string} type - the category type of a card
   * @returns boolean
   */
  checkForType(type: string): boolean {
    if (this.workspace.decks.find((deck) => deck.types.includes(type))) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * this opens the sidebar during the onboarding
   * @returns void
   */
  onboardingOpenSidebar(): void {
    document
      .querySelector(".backdrop-target")
      .setAttribute("style", "background-color: #3a545f");
    this.toggleSidebar("general");
  }

  /**
   * This created a context menu for both cards and groups when right clicking
   * @param  {any} event - event used to check where users click
   * @param  {number} item - the item is used to pass to the methods within the context menu
   * @returns void
   */
  onContextMenu(event: any, item: number): void {
    if (event.target.classList.contains("card-container")) {
      this.checkIfCardContextMenu = true;
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + "px";
      this.contextMenuPosition.y = event.clientY + "px";
      this.contextMenu.menuData = { item: event.target.offsetParent.id };
      this.contextMenu.menu.focusFirstItem("mouse");
      this.contextMenu.openMenu();
    } else {
      this.checkIfCardContextMenu = false;
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + "px";
      this.contextMenuPosition.y = event.clientY + "px";
      this.contextMenu.menuData = { item };
      this.contextMenu.menu.focusFirstItem("mouse");
      this.contextMenu.openMenu();
    }
  }
  /**
   * removes a phase when using the contextmenu on a phase
   * @param  {number} item - in this case the id of the group
   * @returns void
   */
  removePhase(item: number): void {
    for (let i = 0; i < this.workspace.storedLines.length; i++) {
      if (
        this.workspace.storedLines[i].start === item ||
        this.workspace.storedLines[i].end === item
      ) {
        const index = this.lines.findIndex(
          (line) => line.id === this.workspace.storedLines[i].id
        );
        this.lines[index].line.remove();
        this.lines.splice(index, 1);
        this.workspace.storedLines.splice(i, 1);
        i--;
      }
    }
    const Wsindex = this.workspace.groups.findIndex(
      (group) => group.id === item
    );
    const Ws = this.workspace.groups.find((group) => group.id === item);
    this.socketService.removeGroup(this.room, Ws, new VTWorkspaceData(this.workspace));
    this.workspace.groups.splice(Wsindex, 1);
    this.updateWorkspace();
  }

  /**
   * removes a card when using the contextmenu on a card
   * @param  {any} item - in this case the id of the card
   * @returns void
   */
  removeCard(item: any): void {
    const indexSpawnlistId = this.workspace.spawnList.cards.findIndex(
      (card) => card.id === item
    );
    const indexSpawnlistOtherId = this.workspace.spawnList.cards.findIndex(
      (card) => card._id === item
    );
    const indexSpawnlist =
      indexSpawnlistId > indexSpawnlistOtherId
        ? indexSpawnlistId
        : indexSpawnlistOtherId;

    if (indexSpawnlist > -1) {
      this.workspace.spawnList.cards.splice(indexSpawnlist, 1);
      this.updateWorkspace();
      this.socketService.removeCardFromSpawnlist(this.room, {
        cardIndex: indexSpawnlist,
      }, new VTWorkspaceData(this.workspace));
    } else {
      this.workspace.groups.forEach((group) => {
        const indexCardId = group.cards.findIndex((card) => card.id === item);
        const indexCardOtherId = group.cards.findIndex(
          (card) => card._id === item
        );
        const index =
          indexCardId > indexCardOtherId ? indexCardId : indexCardOtherId;
        if (index > -1) {
          group.cards.splice(index, 1);
          this.updateWorkspace();
          this.socketService.removeCardFromGroup(this.room, {
            groupId: group.id,
            cardIndex: index,
          }, new VTWorkspaceData(this.workspace));
        }
      });
    }
  }

  openSearch(data: VTActionOpenSearch) {
    this.searchPhrase = data.searchPhrase;
    this.toggleSidebar('Search');
    this.searchCards();
  }

  openCatalog(data: VTActionOpenCatalog) {
    console.log('Opening catalog tab: ', data)
    switch(data.catalogTab.toLowerCase()) {
      case 'field':
        this.tryOpenCatalogTab('Field');
        break;
      case 'library':
        this.tryOpenCatalogTab('Library');
        break;
      case 'workshop':
        this.tryOpenCatalogTab('Workshop');
        break;
      case 'lab':
        this.tryOpenCatalogTab('Lab');
        break;
      case 'showroom':
        this.tryOpenCatalogTab('Showroom');
        break;
      case 'deliverables':
        this.tryOpenCatalogTab('Deliverables')
        break;
      default: break;
    }
  }

  tryOpenCatalogTab(name: string) {
    if (this.checkForType(name)) this.toggleSidebar(name);
  }
}

export class LeaderLineWithId {
  constructor(id: number, line: LeaderLine) {
    this.id = id;
    this.line = line;
  }
  line: LeaderLine
  id: number
};
