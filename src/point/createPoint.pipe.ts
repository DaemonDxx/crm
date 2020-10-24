import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePointDto } from './dto/createPoint.dto';
import { ParseDate } from '../Utils/PipeFucntions/parseDate.functions';


@Injectable()
export class CreatePointPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata): CreatePointDto {
    const result = value;

    if (result._id) {
      delete result._id;
    }

    result.dateCheck = ParseDate(value.dateCheck);
    result.lastDateCheck = ParseDate(value.lastDateCheck);

    result.power = parseFloat(value.power);
    return value;
  }

  parseContactInfo(arr: string): string[] {
    return arr.split(';');
  }

}