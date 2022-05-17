import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as config from "src/app/config";
@Injectable({
  providedIn: "root",
})
export class MailService {
  inviteExtension = "invite";
  constructor(private httpClient: HttpClient) {}

  /**
   * Invite multiple users to the workspace
   * @param  {{}} obj - containing one or multple users and mail information
   * @returns Observable
   */
  inviteUsers(obj: {}): Observable<{}> {
    return this.httpClient
      .post<{}>(config.apiUrl + this.inviteExtension, obj)
      .pipe();
  }
}
