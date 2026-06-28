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

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
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

}