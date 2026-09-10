import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() complete = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<Todo>();

  isEditing = false;
  editTitle = '';
  editPriority = '';
  editCategory = '';
  editDueDate = '';

  startEdit() {
    this.isEditing = true;
    this.editTitle = this.todo.title;
    this.editPriority = this.todo.priority;
    this.editCategory = this.todo.category;
    this.editDueDate = this.todo.dueDate ? this.todo.dueDate.split('T')[0] : '';
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveEdit() {
    if (!this.editTitle.trim()) return;
    this.update.emit({
      ...this.todo,
      title: this.editTitle,
      priority: this.editPriority,
      category: this.editCategory,
      dueDate: this.editDueDate ? new Date(this.editDueDate).toISOString() : null
    });
    this.isEditing = false;
  }

  get isOverdue(): boolean {
    if (!this.todo.dueDate) return false;
    return new Date(this.todo.dueDate) < new Date();
  }
}
