import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateNotificationDto } from './createNotification.dto';

@Injectable()
export class NotifyPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata): CreateNotificationDto {
    const result = value;

    result.email = value.email?this.parseArray(value.email): null;
    result.points = this.parseArray(value.points);
    result.dateSend = this.parseDate(value.dateSend);
    return result;

  }

  parseDate(date: string): number {
    const temp = new Date(date);
    return temp.setHours(temp.getHours()+12);
  }

  parseArray(st: string): string[] {
    let result = st.replace('[', '');
    result = result.replace(']', '');
    return result.split(',');
  }

}