import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '@app/config';
import { Observable } from 'rxjs';
import { VTRule } from 'src/app/models/virtual-teacher/rules/vt-rule';
import { VTConfigurableAction } from 'src/app/models/virtual-teacher/rules/vt-configurable-action';
import { VTConfigurableCondition } from 'src/app/models/virtual-teacher/rules/vt-configurable-condition';
import { VTConfigurableComparison } from 'src/app/models/virtual-teacher/rules/vt-configurable-comparison';
import { VTConfigurableScope } from 'src/app/models/virtual-teacher/rules/vt-configurable-scope';
import { VTConfigurableSeverity } from 'src/app/models/virtual-teacher/rules/vt-configurable-severity';
import { VTConfigurableCatalogTab } from 'src/app/models/virtual-teacher/rules/vt-configurable-catalog-tab';
import { VTConfigurablePhase } from 'src/app/models/virtual-teacher/rules/vt-configurable-phase';
import { VTConfigurableStrategy } from 'src/app/models/virtual-teacher/rules/vt-configurable-strategy';

@Injectable({
  providedIn: 'root'
})
export class VtRulesService {

  private readonly vtRuleRoute: String = "vt-rules";
  private readonly vtRuleRouteForEditing: String = "vt-rules/all";
  private readonly vtActions: String = "vt-rules/actions";
  private readonly vtConditions: String = "vt-rules/conditions";
  private readonly vtComparisons: String = "vt-rules/comparisons";
  private readonly vtScopes: String = "vt-rules/scopes";
  private readonly vtCatalogTabs: String = "vt-rules/catalog-tabs";
  private readonly vtSeverities: String = "vt-rules/severities";
  private readonly vtPhases: String = "vt-rules/phases";
  private readonly vtStrategies: String = "vt-rules/strategies";

  constructor(private httpClient: HttpClient) { }

  getVtRules(): Observable<VTRule[]> {
    return this.httpClient.get<VTRule[]>(apiUrl + this.vtRuleRoute).pipe();
  }

  getVtRulesForEditing(): Observable<VTRule[]> {
    return this.httpClient.get<VTRule[]>(apiUrl + this.vtRuleRouteForEditing).pipe();
  }



  getVtActions(): Observable<VTConfigurableAction[]> {
    return this.httpClient.get<VTConfigurableAction[]>(apiUrl + this.vtActions).pipe();
  }

  getVtConditions(): Observable<VTConfigurableCondition[]> {
    return this.httpClient.get<VTConfigurableCondition[]>(apiUrl + this.vtConditions).pipe();
  }

  getVtComparisons(): Observable<VTConfigurableComparison[]> {
    return this.httpClient.get<VTConfigurableComparison[]>(apiUrl + this.vtComparisons).pipe();
  }

  getVtScopes(): Observable<VTConfigurableScope[]> {
    return this.httpClient.get<VTConfigurableScope[]>(apiUrl + this.vtScopes).pipe();
  }

  getVtSeverities(): Observable<VTConfigurableSeverity[]> {
    return this.httpClient.get<VTConfigurableSeverity[]>(apiUrl + this.vtSeverities).pipe();
  }

  getVtCatalogTabs(): Observable<VTConfigurableCatalogTab[]> {
    return this.httpClient.get<VTConfigurableCatalogTab[]>(apiUrl + this.vtCatalogTabs).pipe();
  }

  getVtPhases(): Observable<VTConfigurablePhase[]> {
    return this.httpClient.get<VTConfigurablePhase[]>(apiUrl + this.vtPhases).pipe();
  }

  getVtStrategies(): Observable<VTConfigurableStrategy[]> {
    return this.httpClient.get<VTConfigurableStrategy[]>(apiUrl + this.vtStrategies).pipe();
  }



  createRule(rule: VTRule): Observable<VTRule> {
    return this.httpClient.post<any>(apiUrl + this.vtRuleRoute, rule).pipe();
  }

  updateRule(rule: VTRule): Observable<VTRule> {
    return this.httpClient.post<any>(apiUrl + this.vtRuleRoute + "\\" + rule._id, rule).pipe();
  }

  deleteRule(id: string): Observable<VTRule> {
    return this.httpClient.delete<any>(apiUrl + this.vtRuleRoute + "\\" + id).pipe();
  }

  setRuleEnabled(id: string, enable: boolean): Observable<VTRule> {
    return this.httpClient.post<any>(apiUrl + this.vtRuleRoute + "\\" + id + "\\set-enabled", { enable: enable }).pipe();
  }
}
