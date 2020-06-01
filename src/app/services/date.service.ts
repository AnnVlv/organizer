import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date$: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());

  constructor() {
  }

  public changeMonth(monthsCount: number): void {
    this.date$.next(moment(this.date$.value).add(monthsCount, 'month'));
  }

  public changeDay(date: moment.Moment): void {
    this.date$.next(date);
  }
}
