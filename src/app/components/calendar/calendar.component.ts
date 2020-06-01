import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../../services/date.service';
import {IDay} from '../../interfaces/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public days: IDay[];
  public daysOfWeek: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  constructor(public dateService: DateService) {
  }

  public ngOnInit(): void {
    this.dateService.date$.subscribe((date: moment.Moment) => {
      this.generateDays(date);
    });
  }

  private generateDays(date: moment.Moment): void {
    const startDay = date.clone().startOf('month').startOf('week');
    const endDay = date.clone().endOf('month').endOf('week');

    const days: IDay[] = [];

    while (startDay.isBefore(endDay)) {
      days.push({
        date: startDay.add(1, 'day').clone(),
        isCurrentMonth: date.month() === startDay.month(),
        isActive: moment(date).isSame(startDay, 'date')
      });
    }

    this.days = days;
  }

  public changeDay(day: IDay): void {
    this.dateService.changeDay(day.date);
  }
}
