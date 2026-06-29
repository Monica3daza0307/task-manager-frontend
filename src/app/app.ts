import { Component, signal } from '@angular/core';
import { TaskList } from './components/task-list/task-list';
import { ToolbarComponent } from './components/toolbar/toolbar';
import { PublicApiComponent } from './components/public-api/public-api';

@Component({
  selector: 'app-root',
  imports: [
    ToolbarComponent,
    TaskList,
    PublicApiComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}