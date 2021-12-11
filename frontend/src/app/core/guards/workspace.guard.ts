import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { WorkspaceService } from "@app/workspace/services/workspace.service";
import { AuthService } from "@app/auth/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class WorkspaceGuard implements CanActivate {
  constructor(
    private workspaceService: WorkspaceService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * This will check if the user has acces to the workspace by checking if the uid is in the user list of the workspace
   * @param  {ActivatedRouteSnapshot} next - the activated route of the routing snapshot
   * @param  {RouterStateSnapshot} state - the current state of the routing snapshot
   * @returns Promise - returns a true if user has access
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const split = state.url.split("/");
    localStorage.setItem("redirect", state.url);
    return this.authService.getUserUID().then((uid) => {
      return new Promise((resolve, reject) => {
        this.workspaceService
          .getWorkspaceById(split[split.length - 1])
          .subscribe((res) => {
            if (res.users.some((u) => u.uid === uid)) {
              resolve(true);
              localStorage.removeItem("redirect");
            } else {
              this.router.navigate(["/workspaces"]);
              resolve(false);
              localStorage.removeItem("redirect");
            }
          });
      });
    });
  }
}
