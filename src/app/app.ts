import { Component, signal } from '@angular/core';
import { TaskList } from './components/task-list/task-list';
import { ToolbarComponent } from './components/toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [
  ToolbarComponent,
  TaskList
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}