import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as config from '../../config';


@Component({
  selector: 'app-passworddialog',
  templateUrl: './passworddialog.component.html',
  styleUrls: ['./passworddialog.component.css']
})
export class PassworddialogComponent implements OnInit {
  password;

  constructor(public dialogRef: MatDialogRef<AppComponent>, private snackBar: MatSnackBar
) { }

  ngOnInit(): void {
  }

  save() {
// Check if pw is
      if (this.password === config.VerySecretPw) {
        this.dialogRef.close(this.password);
      } else {
        this.snackBar.open('The password is incorrect','cancel',{
          duration: 3000
        });
      }
  }

  close() {
    this.dialogRef.close();
  }

}
