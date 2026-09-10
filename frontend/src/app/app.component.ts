import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoHistoryComponent } from './components/todo-history/todo-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoListComponent, TodoHistoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'To-Do App';
  activeTab: 'active' | 'history' = 'active';

  switchTab(tab: 'active' | 'history') {
    this.activeTab = tab;
  }
}
