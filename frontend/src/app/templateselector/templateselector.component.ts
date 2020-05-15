import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-templateselector',
  templateUrl: './templateselector.component.html',
  styleUrls: ['./templateselector.component.css']
})
export class TemplateselectorComponent implements OnInit {
  templates;

  constructor(public dialogRef: MatDialogRef<AppComponent>, private templateService: TemplateService) { }

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates() {
    this.templateService.getTemplates().subscribe(res => (this.templates = res));
  }

  selectTemplate(template) {
    this.dialogRef.close(template);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
