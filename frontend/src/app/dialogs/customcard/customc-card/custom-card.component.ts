import { Component } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { AppComponent } from 'src/app/app.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css']
})
export class CustomCardComponent {
  card: Card = new Card();
  color = '#ff0000';


  constructor(
    private dialogRef: MatDialogRef<AppComponent>,
  ) { }

  submitted = false;

  onSubmit() { this.submitted = true; }

  save() {
    this.dialogRef.close(this.card);
  }

  close() {
    this.dialogRef.close();
  }

}
