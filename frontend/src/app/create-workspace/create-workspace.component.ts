import { Component, OnInit } from "@angular/core";
import { Workspace } from "../models/workspace.model";
import { WorkspaceService } from "../services/workspace.service";
import { Router } from "@angular/router";
import { TemplateService } from "../services/template.service";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-create-workspace",
  templateUrl: "./create-workspace.component.html",
  styleUrls: ["./create-workspace.component.css"],
})
export class CreateWorkspaceComponent implements OnInit {
  titleControl = new FormControl("", [Validators.required, Validators.min(1)]);
  goalControl = new FormControl("", [Validators.required, Validators.min(1)]);
  workspaceTitle: any;
  target: MouseEvent;
  lockTemplate: boolean = false;
  lockedElement: number = 999;
  workspaceGoal: any;
  templates: Workspace[] = [];
  showErrorRequiredValues: boolean = false;
  constructor(
    private workspaceService: WorkspaceService,
    private templateService: TemplateService,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * This method will start on initializing.
   * @returns void
   */
  ngOnInit(): void {
    this.templateService.getTemplates().subscribe((res) => {
      this.templates = res;
    });
  }

  /**
   * Click on a template.
   * @param  {any} e
   * @returns void
   */
  onTemplateClick(e: any): void {
    if (this.lockTemplate === false) {
      const el = document.getElementById(e);
      el.style.backgroundColor = "#04abd6";
      this.lockedElement = e;
      this.lockTemplate = true;
    } else if (this.lockTemplate === true && this.lockedElement === e) {
      const el = document.getElementById(e);
      el.style.backgroundColor = "white";
      this.lockedElement = 999;
      this.lockTemplate = false;
    } else {
      const oldEl = document.getElementById(this.lockedElement.toString());
      oldEl.style.backgroundColor = "white";
      const el = document.getElementById(e);
      el.style.backgroundColor = "#04abd6";
      this.lockedElement = e;
      this.lockTemplate = true;
    }
  }

  /**
   * Create a new workspace
   * @returns Promise
   */
  async onSave(): Promise<void> {
    if (this.titleControl.valid && this.goalControl.valid) {
      const newWorkspace: Workspace = new Workspace();
      const workspace: Workspace = this.templates[this.lockedElement];
      if (workspace !== undefined) {
        newWorkspace.title = this.titleControl.value;
        newWorkspace.goal = this.goalControl.value;
        newWorkspace.image = workspace.image;
        newWorkspace.groups = workspace.groups;
        newWorkspace.storedLines = workspace.storedLines;
        newWorkspace.customCards = workspace.customCards;
        newWorkspace.decks = workspace.decks;
      } else {
        newWorkspace.title = this.titleControl.value;
        newWorkspace.goal = this.goalControl.value;
        newWorkspace.image = "";
        newWorkspace.groups = [];
        newWorkspace.storedLines = [];
        newWorkspace.customCards = [];
        newWorkspace.decks = [];
      }

      this.authService.getUserUID().then((uid) => {
        newWorkspace.users.push({
          uid,
          type: 0,
        });
      });
      this.workspaceService.postWorkspace(newWorkspace).subscribe((res) => {
        if (res) {
          this.router.navigate(["workspaces"]);
        }
      });
    } else {
      this.showErrorRequiredValues = true;
      await this.delay(5000);
      this.showErrorRequiredValues = false;
    }
  }

  /**
   * Go back to the workspaces list.
   * @returns void
   */
  onBack(): void {
    this.router.navigate(["workspaces"]);
  }

  /**
   * this adds a waited delay as a sleep function.
   * @param  {number} ms - amount of ms to wait.
   * @returns Promise - returns a promise to resolve.
   */
  delay(ms): Promise<number> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
