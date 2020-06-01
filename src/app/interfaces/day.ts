import * as moment from 'moment';

export interface IDay {
  date: moment.Moment;
  isCurrentMonth: boolean;
  isActive: boolean;
}
