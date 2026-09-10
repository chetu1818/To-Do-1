import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
  dueDate: string | null;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoHistory {
  id: number;
  originalId: number;
  title: string;
  priority: string;
  dueDate: string | null;
  category: string;
  action: string;
  actionAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`);
  }

  getHistory(): Observable<TodoHistory[]> {
    return this.http.get<TodoHistory[]>(`${this.apiUrl}/history`);
  }

  createTodo(title: string, priority: string, dueDate: string | null, category: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/todos`, { title, priority, dueDate, category });
  }

  updateTodo(id: number, title: string, priority: string, dueDate: string | null, category: string): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/todos/${id}`, { title, priority, dueDate, category });
  }

  completeTodo(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/todos/${id}/complete`, {});
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todos/${id}`);
  }
}
