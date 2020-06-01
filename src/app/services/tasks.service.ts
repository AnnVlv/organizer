import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ITask} from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private url = 'https://organizer-3eca8.firebaseio.com';
  private format = 'YYYY-MM-DD';

  constructor(private http: HttpClient) {
  }

  public getTasks(date: moment.Moment): Observable<ITask[]> {
    return this.http.get(`${this.url}/tasks/${date.format(this.format)}.json`)
      .pipe(
        map(tasks => {
          if (!tasks) {
            return [];
          }
          return Object.keys(tasks).map((key: string) => ({...tasks[key], id: key}));
        })
      );
  }

  public createTask(task: ITask): Observable<ITask> {
    return this.http.post<{ name: string }>(`${this.url}/tasks/${task.date}.json`, task)
      .pipe(
        map((newTask: { name: string }) => {
          return {
            ...task,
            id: newTask.name
          };
        })
      );
  }

  public deleteTask(date: moment.Moment, id: string): Observable<null> {
    return this.http.delete<null>(`${this.url}/tasks/${date.format(this.format)}/${id}.json`);
  }
}
