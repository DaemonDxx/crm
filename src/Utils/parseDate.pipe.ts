import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import {ParseDate} from './PipeFucntions/parseDate.functions';
import * as moment from 'moment'

export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    const startDay = moment(new Date(value)).startOf('day');


    return {$gte: startDay.format(), $lte: startDay.endOf('day').format()};
  }


}