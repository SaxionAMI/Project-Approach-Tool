import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { WorkspaceNavbarComponent } from "@app/core/components/navbars/workspace-navbar/workspace-navbar.component";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "@app/auth/services/auth.service";
import { UserService } from "@app/core/services/user.service";
import { User } from "@app/core/models/user.model";
import { ConfirmDeleteAccountDialogComponent } from "../confirm-delete-account-dialog/confirm-delete-account-dialog.component";

@Component({
  selector: "app-settings-dialog",
  templateUrl: "./settings-dialog.component.html",
  styleUrls: ["./settings-dialog.component.css"],
})
export class SettingsDialogComponent implements OnInit {
  firstNameControl = new FormControl("", [
    Validators.required,
    Validators.min(1),
  ]);
  lastNameControl = new FormControl("", [
    Validators.required,
    Validators.min(1),
  ]);
  studyControl = new FormControl("", [Validators.required, Validators.min(1)]);
  schoolControl = new FormControl("", [Validators.required, Validators.min(1)]);
  roleControl = new FormControl("");
  passwordControl = new FormControl("", [
    Validators.required,
    Validators.min(1),
  ]);
  confirmPasswordControl = new FormControl("", [
    Validators.required,
    Validators.min(1),
  ]);
  user: User;
  firstName: any;
  lastName: any;
  study: any;
  school: any;

  constructor(
    public dialogRef: MatDialogRef<WorkspaceNavbarComponent>,
    public dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) {}

  /**
   * This method will start on initializing
   * @returns void
   */
  ngOnInit(): void {
    console.log('test')
    this.authService.getUserUID().then((uid) => {
      console.log('Got user with uid ' + uid);
      if (uid)  {
        this.userService.getUserByUid(uid).subscribe((user) => {
          console.log('got DB user with uid ' + uid, user);
          if (user == null) {
            this.newUser(uid);
          }
          else {
            this.user = user;
            this.firstNameControl.setValue(user.firstName);
            this.lastNameControl.setValue(user.lastName);
            this.studyControl.setValue(user.study);
            this.schoolControl.setValue(user.school);
            this.roleControl.setValue(user.role);
          }
        }, () => {
          this.newUser(uid);
        });
      }
      else {
        console.warn('User uid not found!');
      }
    }).catch(error => {
      console.error(error);
    });
  }

  private newUser(uid: string) {
    console.log('User not found --- making new user');
    //fix for when user wasn't saved correctly.
    this.authService.getUserEmail().then(email => {
      this.user = new User();
      this.user.uid = uid;
      this.user.email = email;
      this.roleControl.setValue('student');
    })
  }

  /**de
   * Save user data
   * @returns void
   */
  onSave(): void {
    const newUser = this.user;
    newUser.firstName = this.firstNameControl.value;
    newUser.lastName = this.lastNameControl.value;
    newUser.study = this.studyControl.value;
    newUser.school = this.schoolControl.value;

    this.userService.updateUser(newUser).subscribe(() => {
      this.dialogRef.close();
    });
  }

  /*
   * Open the dialog, ask for confirmation and then delete the account
   * @returns void
   */
  onDeleteAccount(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteAccountDialogComponent, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "Yes") {
        this.authService.getUserUID().then((uid) => {
          this.userService.deleteUser(uid).subscribe((user) => {
            this.dialogRef.close("deleted");
          });
        });
      }
    });
  }

  /**
   * Close the dialog
   * @returns void
   */
  onClose(): void {
    this.dialogRef.close();
  }

  /**
   * Export a users data
   * @returns void
   */
  onExport(): void {
    this.authService.getUserUID().then((uid) => {
      this.userService.getExportData(uid).subscribe((user) => {
        const json = new Blob([JSON.stringify(user)], {
          type: "text/plain;charset=utf-8",
        });
        const url = window.webkitURL;
        const link = url.createObjectURL(json);
        const a = document.createElement("a");
        a.download = "user-" + Date.now() + ".json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    });
  }
}
