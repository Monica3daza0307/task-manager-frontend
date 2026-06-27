import { Component, signal } from '@angular/core';
import { TaskList } from './components/task-list/task-list';
import { Toolbar } from './components/toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [
  Toolbar,
  TaskList
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}