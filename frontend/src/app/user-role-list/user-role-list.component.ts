import { Component, OnInit } from '@angular/core';
import { UserRole } from '../models/user-role.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})
export class UserRoleListComponent implements OnInit {

  supportedRoles: ['student', 'teacher', 'admin'];

  userRoles: UserRole[] = [];

  private self_uid: string;

  constructor(private userService: UserService, private authService: AuthService) { }

  isSelf(user: UserRole) {
    return this.self_uid == null || user.uid == this.self_uid;
  }

  ngOnInit(): void {
    this.authService.getUserUID().then((uid) => { this.self_uid = uid });
    this.userService.getUserRoles().subscribe(x => { this.userRoles = x });
  }

  higherRole(user: UserRole) {
    switch(user.role) {
      case 'student': return 'teacher';
      case 'teacher': return 'admin';
      default: return user.role;
    }
  }

  lowerRole(user: UserRole) {
    switch(user.role) {
      case 'admin': return 'teacher';
      case 'teacher': return 'student';
      default: return user.role;
    }
  }

  canBePromoted(user: UserRole) {
    return !this.isSelf(user) && (user.role == 'student' || user.role == 'teacher');
  }

  canBeDemoted(user: UserRole) {
    return !this.isSelf(user) && (user.role == 'teacher' || user.role == 'admin');
  }

  demote(user: UserRole) {
    const inMemory = this.userRoles.find(x => x.uid == user.uid);
    if (!inMemory) return;
    if (!this.canBeDemoted(user)) return;

    const role = this.lowerRole(user);
    if (role == user.role) return;

    this.userService.setUserRole(user.uid, role).subscribe(_ => {
      inMemory.role = role;
    })
  }

  promote(user: UserRole) {
    const inMemory = this.userRoles.find(x => x.uid == user.uid);
    if (!inMemory) return;
    if (!this.canBePromoted(user)) return;

    const role = this.higherRole(user);
    if (role == user.role) return;

    this.userService.setUserRole(user.uid, role).subscribe(_ => {
      inMemory.role = role;
    })
  }

  capitalize(value) {
    if (value.length < 2) return value;
    return value.substring(0,1).toUpperCase() + value.substring(1, value.length);
  }
}
