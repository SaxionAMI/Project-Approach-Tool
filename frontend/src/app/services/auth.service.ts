import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { actionCodeSettings } from "../../environments/environment";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private cookieService: CookieService
  ) {}

  /**
   * sent the login email link the email adress
   * @param  {string} email - the given email of a user
   * @returns boolean - returns true when sent
   */
  sendEmailLink(email: string): boolean {
    this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
    this.cookieService.set("emailForSignIn", email);
    return true;
  }

  /**
   * this is used to confirm the signin after the login link has been clicked
   * @param  {string} url - the login url
   * @returns Promise
   */
  async confirmSignIn(url: string): Promise<void> {
    if (this.afAuth.isSignInWithEmailLink(url)) {
      let email = this.cookieService.get("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      this.afAuth.signInWithEmailLink(email, url).catch((error) => {
        this.router.navigate(["login"]);
      });
      this.cookieService.delete("emailForSignIn");
    }
  }

  /**
   * get a user's id token
   * @returns Promise
   */
  async getUserIdToken(): Promise<string> {
    const value = await new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged(
        (user) => {
          if (user) {
            user.getIdToken().then(
              (idToken) => {
                resolve(idToken);
              },
              (error) => {
                resolve(null);
              }
            );
          } else {
            resolve(null);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    });
    return value.toString();
  }

  /**
   * get a user's uid
   * @returns Promise
   */
  async getUserUID(): Promise<string> {
    const value = await new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      });
    });
    return value.toString();
  }

  /**
   * log a user out
   * @returns void
   */
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(["login"]);
    });
  }
}
