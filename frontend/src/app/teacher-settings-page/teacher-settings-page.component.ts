import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GenericApiErrorDialogComponent } from '../generic-api-error-dialog/generic-api-error-dialog.component';
import { VTRule } from '../models/virtual-teacher/rules/vt-rule';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { VtRulesService } from '../services/virtual-teacher/configuring-rules/vt-rules-service/vt-rules.service';
import { RuleEnabledChangedEventArgs } from '../virtual-teacher/configuring-feedback-rules/vt-rules-list/vt-rules-list.component';

@Component({
  selector: 'app-teacher-settings-page',
  templateUrl: './teacher-settings-page.component.html',
  styleUrls: ['./teacher-settings-page.component.css']
})
export class TeacherSettingsPageComponent implements OnInit {

  getRules(service: VtRulesService) {
    return service.getVtRulesForEditing();
  }

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private userService: UserService, 
    private rulesService: VtRulesService,
    private dialog: MatDialog) { }

  role: string = '';

  ngOnInit(): void {
    this.authService.getUserUID().then(uid => {
      this.userService.getUserByUid(uid).subscribe(user => {
        this.role = user.role;
      }, () => {
        this.router.navigate(['/']);
      })
    }, () => {
      this.router.navigate(['/']);
    });
  }

  isAdmin() {
    return this.role == 'admin';
  }

  onRuleEnabledChanged(event: RuleEnabledChangedEventArgs) {
    this.rulesService.setRuleEnabled(event.id, event.enabled).subscribe(_ => {}, error => {
      this.dialog.open(GenericApiErrorDialogComponent);
    });
  }
}
