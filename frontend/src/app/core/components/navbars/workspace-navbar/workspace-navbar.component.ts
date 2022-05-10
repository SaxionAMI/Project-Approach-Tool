declare let LeaderLine: any;
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Workspace } from "../../../models/workspace.model";
import "leader-line";
import { CustomCardComponent } from "../../../../shared/components/dialogs/customcard/customc-card/custom-card.component";
import { workspaceConfig } from "../../../models/workspaceConfig.model";
import { Router } from "@angular/router";
import { UserService } from "@app/core/services/user.service";
import { SocketService } from "@app/core/services/socket.service";
import { InviteDialogComponent } from "@app/shared/components/dialogs/invite-dialog/invite-dialog.component";
import { AuthService } from "@app/auth/services/auth.service";
import { SettingsDialogComponent } from "@app/shared/components/dialogs/settings-dialog/settings-dialog.component";

@Component({
  selector: "app-workspace-navbar",
  templateUrl: "./workspace-navbar.component.html",
  styleUrls: ["./workspace-navbar.component.css"],
})
export class WorkspaceNavbarComponent implements OnInit {
  @Input() lines: typeof LeaderLine[];
  @Input() workspace: Workspace;
  @Input() workspaceConfig: workspaceConfig;
  @Output() customCard = new EventEmitter();
  @Output() arrow = new EventEmitter();
  @Output() group = new EventEmitter();
  @Output() goal = new EventEmitter();
  @Output() question = new EventEmitter();
  @Output() selector = new EventEmitter();
  @Output() title = new EventEmitter();
  @Output() logout = new EventEmitter();
  @Output() invitedUsers = new EventEmitter();
  @Output() removeUser = new EventEmitter();
  @Output() back = new EventEmitter();

  email: string = "";
  firstName: string = "";
  lastName: string = "";
  fullName: string = "";
  role: string = "";
  activeUsers: any[] = [];
  displayInfo: boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private socketService: SocketService,
    private authService: AuthService
  ) {}

  /**
   * This method will start on initializing.
   * It contains most socket observers
   * @returns void
   */
  ngOnInit(): void {
    this.authService.getUserUID().then((uid) => {
      this.userService.getUserByUid(uid).subscribe((user) => {
        if (user) {
          this.email = user.email;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.fullName = user.firstName + " " + user.lastName;
          this.role = user.role;
        } else {
          this.router.navigate(["/load"], {
            queryParams: { FinishRegistration: true },
          });
        }
      });
    });
    this.socketService.on("joinWorkspace").subscribe((res) => {
      this.activeUsers = [];

      if (res.active.length > 0) {
        res.active.forEach((active) => {
          this.userService.getUserByUid(active.user).subscribe((user) => {
            if (user) {
              const fullName = user.firstName + " " + user.lastName;
              if (this.email !== user.email) {
                this.activeUsers.push({
                  email: user.email,
                  fullName,
                  color: active.color,
                });
              }
            }
          });
        });
      }
    });

    this.socketService.on("setEffectOnTitle").subscribe((res) => {
      const el = document.getElementById("title");
      el.style.boxShadow = res.color + " 0px 0px 15px";
    });

    this.socketService.on("removeEffectFromTitle").subscribe((res) => {
      const el = document.getElementById("title");
      el.style.boxShadow = "none";
    });

    this.socketService.on("setEffectOnGoal").subscribe((res) => {
      const el = document.getElementById("goal");
      el.style.boxShadow = res.color + " 0px 0px 15px";
    });

    this.socketService.on("removeEffectFromGoal").subscribe((res) => {
      const el = document.getElementById("goal");
      el.style.boxShadow = "none";
    });
  }

  /**
   * open dialog and add a custom card
   * @returns void
   * TODO: implement custom cards
   */
  AddCustomCard(): void {
    const dialogRef = this.dialog.open(CustomCardComponent, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customCard.emit(result);
      }
    });
  }

  /**
   * emit the goal change
   * @returns void
   */
  saveGoal(): void {
    this.goal.emit("goal");
  }

  /**
   * emit the title change
   * @returns void
   */
  moveFocusToSubtitle(): void {
    this.title.emit("title");
  }

  /**
   * emit the logout
   * @returns void
   */
  onLogout(): void {
    this.logout.emit("logout");
  }

  /**
   * get the abbriviation of a users fullname for the avatar
   * @param  {String} fullName - the full name of a user
   * @returns string
   */
  getAbbriviation(fullName: string): string {
    let returned = "";
    const split = fullName.split(" ");

    if (split.length > 1) {
      returned = split[0][0].toUpperCase() + split[1][0].toUpperCase();
    }

    return returned;
  }

  /**
   * Open the invite dialog
   * @returns void
   */
  openInviteModal(): void {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      width: "800px",
      data: { workspace: this.workspace._id },
    });
    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        if (user.hasOwnProperty("uid") || user.hasOwnProperty("email")) {
          this.removeUser.emit(user);
        } else {
          this.invitedUsers.emit(user);
        }
      }
    });
  }

  /**
   * Open the goal and sent effect on goal
   * @returns void
   */
  openGoal(): void {
    this.workspaceConfig.canEditGoal = true;
    this.socketService.setEffectOnGoal(this.workspace._id);
  }

  /**
   * Open the title and sent effect on title
   * @returns void
   */
  openTitle(): void {
    this.workspaceConfig.canEditTitle = true;
    this.socketService.setEffectOnTitle(this.workspace._id);
  }

  /**
   * Open the settings dialog
   * @returns void
   */
  openSettings(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: "800px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "deleted") {
        this.logout.emit();
      }
    });
  }

  /**
   * Go back to the workspace list
   * @returns void
   */
  goBack(): void {
    this.back.emit();
  }

  /**
   * Restart the onboarding proces
   * @returns void
   */
  restartOnboarding(): void {
    localStorage.setItem("ActiveOnboardingWorkspace", "true");
    localStorage.setItem("ActiveOnboardingWorkspaceList", "true");
    this.back.emit();
    this.router.navigate(["workspaces"]);
  }

  /**
   * Opens the about page in a new tab
   * @returns void
   */
  openAbout(): void {
    window.open(window.location.origin + "/about", "_blank");
  }

  /**
   * Opens the privacy page in a new tab
   * @returns void
   */
  openPrivacy(): void {
    window.open(window.location.origin + "/privacy-statement", "_blank");
  }

  openTeacherSettings(): void {
    window.open(window.location.origin + "/teacher/settings", "_blank");
  }

  isTeacher() {
    return this.role == 'teacher' || this.role == 'admin';
  }
}
