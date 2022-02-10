import { Component, Input } from "@angular/core";
import { Workspace } from "src/app/core/models/workspace.model";

@Component({
  selector: "app-template-card",
  templateUrl: "./template-card.component.html",
  styleUrls: ["./template-card.component.css"],
})
export class TemplateCardComponent {
  constructor() {}

  @Input() template: Workspace;
}
