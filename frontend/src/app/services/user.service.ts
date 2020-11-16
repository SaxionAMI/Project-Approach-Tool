import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import * as config from "../config";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userExtension = "user";
  constructor(private httpClient: HttpClient) {}

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
