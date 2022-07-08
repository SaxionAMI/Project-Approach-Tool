import { Component, OnInit } from "@angular/core";
import { AuthService } from "@app/auth/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormControl, Validators } from "@angular/forms";
import { User } from "@app/core/models/user.model";
import { UserService } from "@app/core/services/user.service";
import { TemplateService } from "@app/workspace/services/template.service";
import { WorkspaceService } from '@app/workspace/services/workspace.service';

@Component({
  selector: "app-finish-auth",
  templateUrl: "./finish-auth.component.html",
  styleUrls: ["./finish-auth.component.css"],
})
export class FinishAuthComponent implements OnInit {
  lastNameControl = new FormControl("", [
    Validators.required,
    Validators.min(1),
  ]);
  firstNameControl = new FormControl("", [
    Validators.required,
    Validators.min(1),
  ]);
  studyControl = new FormControl("", [Validators.required, Validators.min(1)]);
  schoolControl = new FormControl("", [Validators.required, Validators.min(1)]);
  showErrorRequiredValues: boolean = false;
  type: string = "login";
  newUser = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private workspaceService: WorkspaceService
  ) {}

  /**
   * This method will start on initializing
   * @returns void
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      if (params.finishRegistration) {
        this.newUser = true;
      } else {
        await this.authService.confirmSignIn(this.router.url).then(async () => {
          await this.delay(2000);
        });
        this.afAuth.onAuthStateChanged(async (user) => {
          if (user.metadata.creationTime !== user.metadata.lastSignInTime) {
            const url = localStorage.getItem("redirect")
              ? localStorage.getItem("redirect")
              : "/workspaces";
            this.router.navigate([url]);
            localStorage.removeItem("redirect");
          } else {
            this.newUser = true;
          }
        });
      }
    });
  }

  /**
   * this adds a waited delay as a sleep function
   * @param  {number} ms - amount of ms to wait
   * @returns Promise - returns a promise to resolve
   */
  delay(ms): Promise<number> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Check if a user has filled in all the fields and then save the user data.
   * @returns void
   */
  onContinue(): void {
    const EmptyValue =
      this.schoolControl.invalid ||
      this.studyControl.invalid ||
      this.firstNameControl.invalid ||
      this.lastNameControl.invalid;
    if (EmptyValue) {
      this.showErrorRequiredValues = true;
      setTimeout(() => {
        this.showErrorRequiredValues = false;
      }, 5000);
    } else {
      this.afAuth.onAuthStateChanged((user) => {
        const userObj = new User();
        userObj.uid = user.uid;
        userObj.firstName = this.firstNameControl.value;
        userObj.lastName = this.lastNameControl.value;
        userObj.email = user.email;
        userObj.school = this.schoolControl.value;
        userObj.study = this.studyControl.value;
        this.userService.postUser(userObj).subscribe((res) => {
          this.templateService.getExampleTemplate().subscribe((template) => {
            const newTemplate = template;
            newTemplate.users.push({ uid: user.uid, type: 0 });
            this.workspaceService.postWorkspace(newTemplate).subscribe(() => {
            });
          });
          localStorage.setItem("ActiveOnboardingWorkspaceList", "true");
          localStorage.setItem("ActiveOnboardingWorkspace", "true");
          this.router.navigate(["/workspaces"]);
        });
      });
    }
  }
}
