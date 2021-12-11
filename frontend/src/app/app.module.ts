import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { AutoSizeInputModule } from "ngx-autosize-input";
import { FlipModule } from "ngx-flip";
import { MatListModule } from "@angular/material/list";
import { AppRoutingModule } from "./app-routing.module";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { angularFirebaseConfig } from "../environments/environment";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AboutComponent } from "./about/about.component";
import { PrivacyComponent } from "./privacy/privacy.component";

import { AngularResizedEventModule } from "angular-resize-event";
import { CoreModule } from "./core/core.module";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { WorkspaceModule } from "./workspace/workspace.module";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { TeacherModule } from "./teacher/teacher.module";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [AppComponent, AboutComponent, PrivacyComponent],
  imports: [
    AngularFireModule.initializeApp(angularFirebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AutoSizeInputModule,
    FlipModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    AngularResizedEventModule,
    CoreModule,
    WorkspaceModule,
    SharedModule,
    AuthModule,
    TeacherModule,
    MatCardModule,
  ],
  providers: [
    AngularFireAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
// eslint-disable-next-line require-jsdoc
export class AppModule {}
