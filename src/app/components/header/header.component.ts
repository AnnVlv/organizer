import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
import {DateService} from '../../services/date.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public date$: BehaviorSubject<moment.Moment>;

  constructor(public dateService: DateService) {
  }

  public ngOnInit(): void {
    this.date$ = this.dateService.date$;
  }

  public changeMonth(monthsCount: number) {
    this.dateService.changeMonth(monthsCount);
  }
}
