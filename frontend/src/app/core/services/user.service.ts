import { Injectable } from "@angular/core";
import { User } from "@app/core/models/user.model";
import { HttpClient } from "@angular/common/http";
import * as config from "@app/config";
import { Observable } from "rxjs";
import { UserRole } from "@app/core/models/user-role.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  readonly userExtension = "user";
  readonly roleExtension = "role";

  constructor(private httpClient: HttpClient) {}

  getUserRoles(): Observable<UserRole[]> {
    return this.httpClient.get<UserRole[]>(config.apiUrl + this.userExtension + "/" + this.roleExtension)
  }

  setUserRole(userId, role): Observable<UserRole> {
    return this.httpClient.post<UserRole>(config.apiUrl + this.userExtension + "/" + userId + "/" + this.roleExtension, { role: role });
  }

  /**
   * this method is used to post a user
   * @param  {User} user - the user object
   * @returns Observable
   */
  postUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(config.apiUrl + this.userExtension, user)
      .pipe();
  }

  /**
   * this method is used to get a user by uid
   * @param  {string} uid - the uid of a user
   * @returns Observable
   */
  getUserByUid(uid: string): Observable<User> {
    console.log('ID', uid);

    return this.httpClient.get<User>(
      config.apiUrl + this.userExtension + "/" + uid
    );
  }

  /**
   * this method is used to check if the email exists
   * @param  {string} email - the email to check
   * @returns Observable
   */
  checkEmail(email: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      config.apiUrl + this.userExtension + "/check",
      { email }
    );
  }

  /**
   * this method is used to export user data
   * @param  {string} uid - the uid of the user
   * @returns Observable
   */
  getExportData(uid: string): Observable<User> {
    return this.httpClient.get<User>(
      config.apiUrl + this.userExtension + "/export/" + uid
    );
  }

  /**
   * this method is used to update a user
   * @param  {User} user - the user object
   * @returns Observable
   */
  updateUser(user: User): Observable<User> {
    return this.httpClient
      .put<User>(config.apiUrl + this.userExtension + "/" + user.uid, user)
      .pipe();
  }

  /**
   * this method is used to delete a user
   * @param  {string} uid
   * @returns Observable
   */
  deleteUser(uid: string): Observable<User> {
    return this.httpClient
      .delete<User>(config.apiUrl + this.userExtension + "/" + uid)
      .pipe();
  }
}
