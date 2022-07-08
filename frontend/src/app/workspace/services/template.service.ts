import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Workspace } from "@app/core/models/workspace.model";
import { Observable } from "rxjs";
import * as config from "@app/config";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  templateUrlExtension = "template";

  constructor(private httpClient: HttpClient) {}

  /**
   * this method is used to get all templates
   * @returns Observable
   */
  getTemplates(): Observable<Workspace[]> {
    return this.httpClient.get<Workspace[]>(
      config.apiUrl + this.templateUrlExtension
    );
  }

  /**
   * this method is used to get the example template for onboarding
   * @returns Observable
   */
  getExampleTemplate(): Observable<Workspace> {
    return this.httpClient.get<Workspace>(
      config.apiUrl + this.templateUrlExtension + "/example"
    );
  }

  /**
   * this method is used to post a template
   * @param  {Workspace} workspace - the workspace to turn into a template
   * @returns Observable
   */
  postTemplate(workspace: Workspace): Observable<Workspace[]> {
    return this.httpClient
      .post<Workspace[]>(config.apiUrl + this.templateUrlExtension, workspace)
      .pipe();
  }
}
