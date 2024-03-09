import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'app/Task';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(this.apiUrl);
  }

  getTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}`);
  }

  deleteTask(taskId: number): Observable<Array<Task>> {
    return this.http.delete(`${this.apiUrl}/${taskId}`).pipe(
      switchMap(() => this.getTasks())
    )
  }

  setReminder(taskId: number) {
    return this.getTask(taskId).pipe(
      switchMap((task) => {
        const updatedTask = { ...task, reminder: !task.reminder };

        return this.http.put(`${this.apiUrl}/${taskId}`, updatedTask).pipe(
          switchMap(() => this.getTasks())
        );
      })
    );
  }
}
