import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Workspace, WorkspaceData } from "@app/core/models/workspace.model";
import { Observable } from "rxjs";
import * as config from "@app/config";
import { Card } from "@app/core/models/card.model";

@Injectable({
  providedIn: "root",
})
export class WorkspaceService {
  workspaceUrlExtension = "workspace";
  workspaceByUIDUrlExtension = "workspaces";
  workspaceCustomCardExtension = "workspace/customCard";

  constructor(
    private httpClient: HttpClient
  ) {}

  /**
   * this method is used to post a workspace
   * @param  {Workspace} workspace - the workspace object to post
   * @returns Observable
   */
  postWorkspace(workspace: Workspace): Observable<Workspace> {
    return this.httpClient
      .post<Workspace>(config.apiUrl + this.workspaceUrlExtension, workspace)
      .pipe();
  }

  /**
   * this method is used to upsert a workspace by id
   * @param  {Workspace} workspace - the workspace object to upsert
   * @returns Observable
   */
  upsertWorkspaceById(workspace: Workspace): Observable<Workspace> {
    const clone = workspace.data();
    return this.httpClient
      .post<Workspace>(
        config.apiUrl + this.workspaceUrlExtension + "/" + clone._id,
        clone
      )
      .pipe();
  }

  updateWorkspaceGroups(workspace: WorkspaceData): Observable<WorkspaceData> {
    return this.httpClient
      .put<WorkspaceData>(
        config.apiUrl + this.workspaceUrlExtension + "/" + workspace._id,
        {groups: workspace.groups}
      );
  }

  /**
   * this method is used to get a workspace by id
   * @param  {string} id - the id of a workspace
   * @returns Observable
   */
  getWorkspaceById(id: string): Observable<Workspace> {
    return this.httpClient.get<Workspace>(
      config.apiUrl + this.workspaceUrlExtension + "/" + id
    );
  }

  /**
   * this method is used to get a multiple workspaces a user has acces to
   * @param  {string} uid - the uid of a user
   * @returns Observable
   */
  getWorkspaces(uid: string): Observable<Workspace[]> {

    return this.httpClient.post<Workspace[]>(
      config.apiUrl + this.workspaceByUIDUrlExtension + "/",
      { uid }
    );
  }

  /**
   * this method is used to delete a workspace
   * @param  {string} id - the id of a workspace
   * @returns Observable
   */
  deleteWorkspace(id: string): Observable<[]> {
    return this.httpClient.delete<[]>(
      config.apiUrl + this.workspaceUrlExtension + "/" + id
    );
  }

  /**
   * get all the cards by user id
   * @param  {string} id - the id of a user
   * @returns Observable
   */
  getCustomCards(id: string): Observable<Card[]> {
    return this.httpClient.get<Card[]>(
      config.apiUrl + this.workspaceCustomCardExtension + "/" + id
    );
  }
}
