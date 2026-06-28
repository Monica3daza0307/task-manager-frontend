import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
  ReactiveFormsModule,

  MatDialogModule,
  MatButtonModule,

  MatInputModule,
  MatFormFieldModule,
  MatSelectModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskFormComponent implements OnInit {

  ngOnInit(): void {

  if (this.data) {

    this.taskForm.patchValue({

      titulo: this.data.titulo,
      descripcion: this.data.descripcion,
      estado: this.data.estado

    });

  }

}

 private fb = inject(FormBuilder);

private taskService = inject(TaskService);

private dialogRef = inject(MatDialogRef<TaskFormComponent>);

readonly data = inject(MAT_DIALOG_DATA, { optional: true });

  taskForm = this.fb.group({

    titulo: ['', Validators.required],

    descripcion: ['', Validators.required],

    estado: ['pendiente', Validators.required]

  });

  guardar() {

  if (this.taskForm.invalid) {
    return;
  }

  const task = this.taskForm.value as Task;

  // MODO EDITAR
  if (this.data) {

    this.taskService.updateTask(this.data.id!, task)
      .subscribe({

        next: () => {

          this.taskService.notifyRefresh();
          this.dialogRef.close(true);

        },

        error: (err) => console.error(err)

      });

    return;
  }

  // MODO CREAR
  this.taskService.createTask(task)
    .subscribe({

      next: () => {

        this.taskService.notifyRefresh();
        this.dialogRef.close(true);

      },

      error: (err) => console.error(err)

    });

}

}
