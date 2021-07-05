import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserService } from "src/app/services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { SettingsDialogComponent } from "src/app/dialogs/settings-dialog/settings-dialog.component";
import { MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  @Input() wsId: string;
  @Output() onboard = new EventEmitter();

  email: string = "";
  fullName: string = "";
  role: string = "";
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}
  @ViewChild("MenuTrigger") MenuTrigger: MatMenuTrigger;

  /**
   * This method will start on initializing.
   * @returns void
   */
  ngOnInit(): void {
    if (
      this.router.url === "/teacher/settings" ||
      this.router.url === "/workspaces" ||
      this.router.url === "/workspace/create"
    ) {
      this.authService.getUserUID().then((uid) => {
        this.userService.getUserByUid(uid).subscribe((user) => {
          if (user) {
            this.email = user.email;
            this.fullName = user.firstName + " " + user.lastName;
            this.role = user.role;
          } else {
            this.router.navigate(["/load"], {
              queryParams: { finishRegistration: true },
            });
          }
        });
      });
    }
  }

  /**
   * Go to the workspace create page
   * @returns void
   */
  goToWorkspaceCreator(): void {
    this.router.navigate(["workspace/create"]);
  }

  /**
   * go to the workspaces list
   * @returns void
   */
  goBack(): void {
    this.router.navigate(["workspaces"]);
  }

  /**
   * Check if HTMLObject should be displayed here
   * @param  {} route
   * @returns boolean
   */
  checkIfDisplayedHere(route): boolean {
    return this.router.url.indexOf(route) === 0;
  }

  hasRole(role): Promise<boolean> {
    return this.authService.hasRole(role);
  }

  /**
   * logs out a user
   * @returns void
   */
  onLogout(): void {
    this.authService.logout();
  }

  /**
   * get the abbriviation of a users fullname for the avatar
   * @param  {string} fullName
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
   * open the settings dialog
   * @returns void
   */
  openSettings(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: "800px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "deleted") {
        this.authService.logout();
      }
    });
  }

  /**
   * Restart the onboarding proces
   * @returns void
   */
  restartOnboarding(): void {
    localStorage.setItem("ActiveOnboardingWorkspace", "true");
    localStorage.setItem("ActiveOnboardingWorkspaceList", "true");
    this.onboard.emit("onboard");
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

  /**
   * Check if a user is on the login page
   * @returns boolean
   */
  checkIfLogin(): boolean {
    return this.router.url === "/login";
  }

  /**
   * Check if a user is on the about page
   * @returns boolean
   */
  checkIfAbout(): boolean {
    return this.router.url === "/about";
  }

  /**
   * Check if a user is on the privacy page
   * @returns boolean
   */
  checkIfPrivacy(): boolean{
    return this.router.url === "/privacy-statement";
  }

  openTeacherSettings(): void {
    this.router.navigate(["teacher/settings"]);
  }

  openWorkspaces(): void {
    this.router.navigate(["workspaces"]);
  }

  isTeacher() {
    return this.role == 'teacher' || this.role == 'admin';
  }
}
