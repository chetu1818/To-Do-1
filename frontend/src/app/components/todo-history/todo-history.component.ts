import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService, TodoHistory } from '../../services/todo.service';

@Component({
  selector: 'app-todo-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-history.component.html',
  styleUrl: './todo-history.component.css'
})
export class TodoHistoryComponent implements OnInit {
  history: TodoHistory[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.todoService.getHistory().subscribe({
      next: (data) => this.history = data,
      error: (err) => console.error(err)
    });
  }
}
