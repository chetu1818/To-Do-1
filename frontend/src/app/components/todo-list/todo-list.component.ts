import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  newTodoPriority: string = 'Medium';
  newTodoCategory: string = 'Personal';
  newTodoDueDate: string = '';
  searchTerm: string = '';

  constructor(private todoService: TodoService) {}

  get filteredTodos(): Todo[] {
    if (!this.searchTerm.trim()) {
      return this.todos;
    }
    const lowerTerm = this.searchTerm.toLowerCase();
    return this.todos.filter(t => 
      t.title.toLowerCase().includes(lowerTerm) || 
      t.category.toLowerCase().includes(lowerTerm)
    );
  }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (data) => this.todos = data,
      error: (err) => console.error(err)
    });
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return;
    
    // Pass null if empty
    const dueDate = this.newTodoDueDate ? new Date(this.newTodoDueDate).toISOString() : null;

    this.todoService.createTodo(
      this.newTodoTitle, 
      this.newTodoPriority, 
      dueDate, 
      this.newTodoCategory
    ).subscribe({
      next: (todo) => {
        this.todos.unshift(todo);
        this.newTodoTitle = '';
        this.newTodoPriority = 'Medium';
        this.newTodoCategory = 'Personal';
        this.newTodoDueDate = '';
      },
      error: (err) => console.error(err)
    });
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(
      todo.id,
      todo.title,
      todo.priority,
      todo.dueDate,
      todo.category
    ).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (err) => console.error(err)
    });
  }

  completeTodo(id: number) {
    this.todoService.completeTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== id);
      },
      error: (err) => console.error(err)
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== id);
      },
      error: (err) => console.error(err)
    });
  }
}
