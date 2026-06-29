import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class ToolbarComponent {

  private dialog = inject(MatDialog);

  nuevaTarea() {
    this.dialog.open(TaskFormComponent, {
      width: '600px'
    });
  }

}