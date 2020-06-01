import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  public transform(value: moment.Moment, format: string = 'MMMM YYYY'): string {
    return value.format(format);
  }

}
