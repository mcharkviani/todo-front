import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ITask} from '../interfaces/ITask';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksUrl = environment.apiUrl + '/tasks';
  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl).pipe(
      catchError(this.errorHandler)
    );
  }
  addTask(task: any): Observable<ITask> {
    return this.http.post<ITask>(this.tasksUrl, task).pipe(
      tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }
  updateTask(id: string, task: ITask): Observable<ITask> {
    return this.http.patch<ITask>(`${this.tasksUrl}/${id}`, task).pipe(
      map((data) => data),
      catchError(this.errorHandler)
    );
  }
  deleteTask(id: any): Observable<ITask> {
    return this.http.delete<ITask>(`${this.tasksUrl}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }
  showCompletedTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.tasksUrl}/completed`).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
}
