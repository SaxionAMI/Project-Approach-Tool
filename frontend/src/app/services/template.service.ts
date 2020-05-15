import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Workspace } from '../models/workspace.model';
import { Observable } from 'rxjs';
import * as config from '../config';


@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  templateUrlExtension = 'template';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  getTemplates() {
    return this.httpClient.get<Workspace>(config.apiUrl + this.templateUrlExtension);
  }

  postTemplate(workspace: Workspace): Observable<Workspace> {
    return this.httpClient.post<Workspace>(config.apiUrl + this.templateUrlExtension, workspace, this.httpOptions)
    .pipe();
  }
}
