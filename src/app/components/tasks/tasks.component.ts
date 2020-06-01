import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../../services/date.service';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {TasksService} from '../../services/tasks.service';
import {ITask} from '../../interfaces/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public date$: BehaviorSubject<moment.Moment>;
  public tasks: ITask[];
  public newTaskText: string;

  constructor(public dateService: DateService, private tasksService: TasksService) {
  }

  public ngOnInit(): void {
    this.date$ = this.dateService.date$;

    this.dateService.date$
      .pipe(
        switchMap((date: moment.Moment) => this.tasksService.getTasks(date))
      )
      .subscribe((tasks: ITask[]) => {
        this.tasks = tasks;
      });
  }

  public addTask(): void {
    const task: ITask = {
      title: this.newTaskText,
      date: this.date$.value.format('YYYY-MM-DD')
    };
    this.tasksService.createTask(task).subscribe((newTask: ITask) => {
      this.newTaskText = '';
      this.tasks.push(newTask);
    });
  }

  public deleteTask(id: string): void {
    this.tasksService.deleteTask(this.date$.value, id).subscribe(() => {
      this.tasks = this.tasks.filter((task: ITask) => task.id !== id);
    });
  }
}
