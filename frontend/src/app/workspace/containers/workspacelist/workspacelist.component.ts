import { Component, OnInit } from "@angular/core";
import { Workspace } from "@app/core/models/workspace.model";
import { WorkspaceService } from "@app/workspace/services/workspace.service";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { JoyrideService } from "ngx-joyride";
import { TemplateService } from "@app/workspace/services/template.service";
@Component({
  selector: "app-workspacelist",
  templateUrl: "./workspacelist.component.html",
  styleUrls: ["./workspacelist.component.css"],
})
export class WorkspacelistComponent implements OnInit {
  workspaces: Workspace[];
  onboardingWorkspaceId: string;
  constructor(
    private workspaceService: WorkspaceService,
    private authService: AuthService,
    private joyrideService: JoyrideService,
    private templateService: TemplateService,
    private router: Router
  ) {}

  /**
   * This method will start on initializing.
   * @returns void
   */
  ngOnInit(): void {
    this.authService.getUserUID().then((uid) => {
      this.workspaceService.getWorkspaces(uid).subscribe((res) => {
        this.workspaces = res;
        this.startOnboarding();
      });
    });
  }
  /**
   * this is to delete workspace.
   * @param  {} confirmation
   * @returns void
   */
  deleteWorkspace(confirmation): void {
    this.workspaces.splice(
      this.workspaces.findIndex((i) => {
        return i._id === confirmation;
      }),
      1
    );
    this.workspaceService.deleteWorkspace(confirmation).subscribe();
  }
  /**
   * This method will create copy of another workspace.
   * @param  {} copy - is the copy workspace.
   * @returns void
   */
  makeCopy(copy): void {
    this.authService.getUserUID().then(uid => {
      const workspaceCopy = copy;
      workspaceCopy.users.push({uid, type: 0});
      this.workspaces.push(workspaceCopy);
      this.workspaceService.postWorkspace(workspaceCopy).subscribe();
    });
  }
  /**
   * This method will navigate to the workspace when the onboarding tour is done.
   * Then the second part of the tour will start.
   * @returns void
   */
  onDone(): void {
    this.router.navigate(["/workspace/" + this.onboardingWorkspaceId]);
  }

  /**
   * This method start the onboarding and checks if the example workspace that is used by the onboarding tour exist.
   * If it not exists, it will create the example.
   * @returns void
   */
  startOnboarding(): void {
    this.authService.getUserUID().then((uid) => {
      this.workspaceService.getWorkspaces(uid).subscribe((res) => {
        this.workspaces = res;
        const exampleTitle = "EXAMPLE - GRANDMA'S ROBOT";
        if (!this.workspaces.find((ws) => ws.title === exampleTitle)) {
          this.templateService.getExampleTemplate().subscribe((template) => {
            const newTemplate = template;
            newTemplate.users.push({ uid, type: 0 });
            this.workspaceService.postWorkspace(newTemplate).subscribe(() => {
              this.workspaceService
                .getWorkspaces(uid)
                .subscribe((workspaces) => {
                  this.workspaces = workspaces;
                  this.startTour(exampleTitle);
                });
            });
          });
        } else {
          this.startTour(exampleTitle);
        }
      });
    });
  }

  /**
   * This method starts the onboarding tour
   * @param  {string} title - is the title of the example workspace
   * @returns void
   */
  startTour(title: string): void {
    if (localStorage.getItem("ActiveOnboardingWorkspaceList") === "true") {
      this.onboardingWorkspaceId = this.workspaces.find(
        (ws) => ws.title === title
      )._id;
      this.joyrideService
        .startTour({
          steps: ["step1", "step2", "step3", "step4", "step5"],
        })
        .subscribe(
          (steps) => {
            if (steps.name === "step2") {
              document.querySelector("#profile-button").scrollIntoView();
            }
            if (steps.name === "step4") {
              document.querySelector("#add-button").scrollIntoView();
            }
            if (steps.name === "step3") {
              document.querySelector("#question-button").scrollIntoView();
            }
          },
          (error) => {},
          () => {
            localStorage.removeItem("ActiveOnboardingWorkspaceList");
          }
        );
    }
  }
}
