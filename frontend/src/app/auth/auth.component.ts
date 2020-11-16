import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  user: Observable<any>;
  email: string;
  emailSent: boolean = false;
  errorMsg: string;
  loginEmailControl = new FormControl("", [
    Validators.required,
    Validators.min(1),
    Validators.email,
  ]);

  constructor(private authService: AuthService) {}

  /**
   * Login a user
   * @returns void
   */
  onLogin(): void {
    this.email = this.loginEmailControl.value;
    this.emailSent = this.authService.sendEmailLink(
      this.loginEmailControl.value
    );
  }
}
