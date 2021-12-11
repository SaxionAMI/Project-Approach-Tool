import { WorkspacelistComponent } from "./workspace/containers/workspacelist/workspacelist.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WorkspaceComponent } from "./workspace/components/workspace-com/workspace.component";
import { CreateWorkspaceComponent } from "./workspace/containers/create-workspace/create-workspace.component";
import { AuthComponent } from "./auth/containers/auth-comp/auth.component";
import { FinishAuthComponent } from "./auth/components/finish-auth/finish-auth.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  customClaims,
} from "@angular/fire/auth-guard";
import { WorkspaceGuard } from "./core/guards/workspace.guard";
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import { TeacherSettingsPageComponent } from "./teacher/containers/teacher-settings-page/teacher-settings-page.component";

const teacherOnly = () => pipe(customClaims, map(claims => {
  console.log(claims);
  return claims.role === 'teacher' || claims.role === 'admin'
}));
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectLoggedInToWorkspaces = () => redirectLoggedInTo(["workspaces"]);

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "login",
    component: AuthComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToWorkspaces },
  },
  { path: "load", component: FinishAuthComponent },
  {
    path: "workspaces",
    component: WorkspacelistComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: "workspace/create",
    component: CreateWorkspaceComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: "workspace/:id",
    component: WorkspaceComponent,
    canActivate: [AngularFireAuthGuard, WorkspaceGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: "teacher/settings",
    component: TeacherSettingsPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: teacherOnly },
  },
  { path: "about", component: AboutComponent},
  { path: "privacy-statement", component: PrivacyComponent},
  { path: "**", redirectTo: "/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
