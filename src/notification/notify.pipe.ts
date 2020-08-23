import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateNotificationDto } from './createNotification.dto';
import {ParseArray} from '../Utils/PipeFucntions/stringToArray.function';
import { ParseDate } from '../Utils/PipeFucntions/parseDate.functions';

@Injectable()
export class NotifyPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata): CreateNotificationDto {
    const result = value;

    result.email = value.email?ParseArray(value.email): null;
    result.points = ParseArray(value.points);
    result.dateSend = ParseDate(value.dateSend);
    return result;

  }

}