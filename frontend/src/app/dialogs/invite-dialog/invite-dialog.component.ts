import { Component, OnInit, Inject } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";
import { UserService } from "src/app/services/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { WorkspaceNavbarComponent } from "src/app/navbars/workspace-navbar/workspace-navbar.component";
import { ConfirmDeleteInviteComponent } from "../confirm-delete-invite/confirm-delete-invite.component";
import { MailService } from "src/app/services/mail.service";
import { Workspace } from "src/app/models/workspace.model";
import { WorkspaceService } from "src/app/services/workspace.service";
import { Permission } from "src/app/models/Permission.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-invite-dialog",
  templateUrl: "./invite-dialog.component.html",
  styleUrls: ["./invite-dialog.component.css"],
})
export class InviteDialogComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  emailForm: FormGroup;
  fb: FormBuilder = new FormBuilder();
  filteredEmails: Observable<string[]>;
  emails: any[] = [];
  emailsToInvite: string[] = [];
  dataSource: any;
  validArray: boolean = false;
  displayedColumns: string[] = ["email", "type", "options"];
  workspace: Workspace;
  displayErrorEmailIncorrect: boolean = false;
  displayErrorEmailInUse: boolean = false;
  displayErrorAccountDoesNotExist: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    public dialogRef: MatDialogRef<WorkspaceNavbarComponent>,
    public dialog: MatDialog,
    private mailService: MailService,
    private workspaceService: WorkspaceService,
    private authService: AuthService
  ) {}

  /**
   * This method will start on initializing.
   * @returns void
   */
  ngOnInit(): void {
    this.emailForm = this.fb.group({
      emails: this.fb.array([], [this.validateArrayNotEmpty]),
    });

    const dataArray: {}[] = [];
    this.workspaceService
      .getWorkspaceById(this.data.workspace)
      .subscribe((ws) => {
        this.workspace = ws;
        const owners: Permission[] = ws.users.filter((u) => u.type === 0);
        const editors: Permission[] = ws.users.filter((u) => u.type === 1);
        const invited: Permission[] = ws.users.filter((u) =>
          u.hasOwnProperty("email")
        );

        owners.forEach((owner) => {
          this.userService.getUserByUid(owner.uid).subscribe((user) => {
            dataArray.push({ email: user.email, type: "Owner", options: "" });
            if (owners.length === dataArray.length) {
              if (editors.length > 0) {
                editors.forEach((editor) => {
                  this.userService
                    .getUserByUid(editor.uid)
                    .subscribe((user) => {
                      dataArray.push({
                        email: user.email,
                        type: "Editor",
                        options: "",
                      });
                      if (owners.length + editors.length === dataArray.length) {
                        if (invited.length > 0) {
                          invited.forEach((invite) => {
                            dataArray.push({
                              email: invite.email,
                              type: "Awaiting invite",
                              options: "",
                            });
                            if (
                              owners.length + editors.length + invited.length ===
                              dataArray.length
                            ) {
                              this.dataSource = new MatTableDataSource(
                                dataArray
                              );
                            }
                          });
                        } else {
                          this.dataSource = new MatTableDataSource(dataArray);
                        }
                      }
                    });
                });
              } else {
                this.dataSource = new MatTableDataSource(dataArray);
              }
            }
          });
        });
      });
  }

  /**
   * Add an email to the editText
   * @param  {MatChipInputEvent} event - the chip event
   * @returns void
   */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (!this.dataSource.filteredData.some((user) => user.email === value)) {
      if (value) {
        if (this.validateEmail(value)) {
          this.userService.checkEmail(value).subscribe((result) => {
            if (result) {
              this.emails.push({ value, invalid: false });
              this.emailsToInvite.push(value);
            } else {
              this.emails.push({ value, invalid: true });
              this.displayErrorAccountDoesNotExist = true;
            }
          });
        } else {
          this.emails.push({ value, invalid: true });
          this.displayErrorEmailIncorrect = true;
        }
      }
    } else {
      if (value) {
        this.displayErrorEmailInUse = true;
        this.emails.push({ value, invalid: true });
      }
    }

    if (input) {
      input.value = "";
    }
  }

  /**
   * Remove and email from the edittext
   * @param  {string} email - the email to invite
   * @returns void
   */
  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
      this.displayErrorEmailIncorrect = false;
      this.displayErrorEmailInUse = false;
      this.displayErrorAccountDoesNotExist = false;
    }
  }

  /**
   * Close the dialog
   * @returns void
   */
  onClose(): void {
    this.dialogRef.close();
  }

  /**
   * Open the invite dialog
   * @returns void
   */
  onInvite(): void {
    const jsonObj = {
      users: this.emailsToInvite,
      workspace: this.workspace._id,
    };
    this.dialogRef.close({ users: jsonObj.users });
    this.authService.getUserUID().then((uid) => {
      this.userService.getUserByUid(uid).subscribe((user) => {
        const json = {
          users: jsonObj.users,
          workspace: jsonObj.workspace,
          invitee: user
        };
        this.mailService.inviteUsers(json).subscribe(() => {});
      });
    });
  }

  /**
   * This opens the confirm revokation dialog
   * @param  {any} el
   * @returns void
   */
  confirmRevokeInvite(el: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteInviteComponent, {
      width: "400px",
      data: el,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex(
          (u) => u.email === result.email
        );
        this.dialogRef.close(this.workspace.users[index]);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  /**
   * Check if the array is not empty
   * @param  {FormControl} c - the formControl to validate
   * @returns any
   */
  validateArrayNotEmpty(c: FormControl): any {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false },
      };
    }
    return null;
  }

  /**
   * This method validates an email by using a regex.
   * @param  {string} email
   * @returns boolean
   */
  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * This method validates the emails in the array
   * @returns boolean
   */
  validateArray(): boolean {
    let valid = false;
    if (this.emails.length > 0) {
      valid = true;
      this.emails.forEach((email) => {
        if (email.invalid) {
          valid = false;
        }
      });
    }
    return valid;
  }
}
