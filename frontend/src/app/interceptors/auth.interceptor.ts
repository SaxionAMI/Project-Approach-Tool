import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { from, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  /**
   * This is used to intercept all requests sent from services
   * @param  {HttpRequest<unknown>} request - the request that is being sent
   * @param  {HttpHandler} next - the httphandler that is handling all requests
   * @returns Observable - containing the edited clone of the request
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return from(this.authService.getUserIdToken()).pipe(
      switchMap((token) => {
        const headers = request.headers
          .set("Authorization", token)
          .append("Content-Type", "application/json");
        const requestClone = request.clone({
          headers,
        });
        return next.handle(requestClone);
      })
    );
  }
}
