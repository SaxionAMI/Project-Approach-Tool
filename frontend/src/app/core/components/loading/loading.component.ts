import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
})
export class LoadingComponent implements OnInit {
  @Input() type: string;
  text: string;
  constructor() {}

  /**
   * This method will start on initializing.
   * @returns void
   */
  ngOnInit(): void {
    if (this.type === "workspace") {
      this.text = "Loading your workspace!";
    } else if (this.type === "login") {
      this.text = "Finishing login!";
    }
  }
}
