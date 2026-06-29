import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { TaskService } from '../../services/task';
import { Task } from '../../models/task';

import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
  CommonModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
  MatCardModule
],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList implements OnInit {

  tasks: Task[] = [];

  displayedColumns: string[] = [
    'id',
    'titulo',
    'estado',
    'acciones'
  ];

  getChipColor(estado: string): 'primary' | 'accent' | 'warn' {

  switch (estado.toLowerCase()) {

    case 'completada':
      return 'primary';

    case 'en progreso':
      return 'accent';

    default:
      return 'warn';

  }

}

  constructor(
  private taskService: TaskService,
  private dialog: MatDialog
) {}

  ngOnInit(): void {

  this.loadTasks();

  this.taskService.refreshRequired$.subscribe(() => {
    this.loadTasks();
  });

    
  

}

  loadTasks(): void {
  this.taskService.getTasks().subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data);
      this.tasks = data;
    },
    error: (error) => {
      console.error('Error:', error);
    }
  });
}

editar(task: Task): void {

  const dialogRef = this.dialog.open(TaskFormComponent, {
    width: '600px',
    data: task
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {
      this.loadTasks();
    }

  });

}

eliminar(task: Task): void {

  alert('Entró al método eliminar');

  if (!task.id) return;

  if (confirm(`¿Desea eliminar la tarea "${task.titulo}"?`)) {

    this.taskService.deleteTask(task.id).subscribe({

      next: () => {

        this.loadTasks();

      },

      error: (err) => console.error(err)

    });

  }

}

}