import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import * as moment from 'moment'

export class QueryDatePipe implements PipeTransform {

  unitOfTime: any;

  constructor(unitOfTime: string) {
    this.unitOfTime = unitOfTime;
  }

  transform(value: any, metadata: ArgumentMetadata): any {
    try {
      const startDay = this._getStartDay(value);
      const endDay = this._getEndDay(value);
      return {
        $gte: startDay, $lte: endDay
      };
    } catch (e) {
      new BadRequestException({
        message: "Неверный формат даты"
      });
    }
  }

  _getStartDay(date): string {
    return moment(new Date(date)).startOf(this.unitOfTime).format();
  }

  _getEndDay(date): string {
    return moment(new Date(date)).endOf(this.unitOfTime).format();
  }


}