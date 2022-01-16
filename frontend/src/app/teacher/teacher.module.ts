import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherSettingsPageComponent } from './containers/teacher-settings-page/teacher-settings-page.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { UserRoleListComponent } from './components/user-role-list/user-role-list.component';
import { WorkspaceModule } from '@app/workspace/workspace.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    TeacherSettingsPageComponent,
    UserRoleListComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    WorkspaceModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    TeacherSettingsPageComponent,
    UserRoleListComponent,
  ]
})
export class TeacherModule { }
