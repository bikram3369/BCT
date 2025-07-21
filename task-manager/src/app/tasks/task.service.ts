import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

export interface Task {
  _id?: string; // from MongoDB
  id: number;   // always required locally
  title: string;
  completed: boolean;
  editing: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:5000/api/tasks';
  tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {
    this.fetchTasks();
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  fetchTasks() {
    this.http.get<Task[]>(this.baseUrl, this.getAuthHeaders())
      .subscribe(data => this.tasks.set(data));
  }

  addTask(title: string) {
    this.http.post<Task>(this.baseUrl, { title, completed: false }, this.getAuthHeaders())
      .subscribe({
        next: (newTask) => {
          const patchedTask = {
            ...newTask,
            id: Date.now(),
            editing: false
          };
          this.tasks.update(t => [...t, patchedTask]);
        },
        error: (err) => {
          console.error('⛔ Error:', err.error);
        }
      });
  }

  updateTask(task: Task) {
    this.http.put<Task>(`${this.baseUrl}/${task._id}`, task, this.getAuthHeaders())
      .subscribe(updated => {
        this.tasks.update(t => t.map(i => i._id === updated._id ? updated : i));
      });
  }

  deleteTask(id: string) {
    this.http.delete(`${this.baseUrl}/${id}`, this.getAuthHeaders())
      .subscribe(() => {
        this.tasks.update(t => t.filter(i => i._id !== id));
      });
  }
}
