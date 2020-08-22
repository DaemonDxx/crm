import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreatePointDto } from './createPoint.dto';


@Injectable()
export class CreatePointPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata): CreatePointDto {
    const result = value;
    
    result.dateCheck = this.parseDate(value.dateCheck);
    result.lastDateCheck = this.parseDate(value.lastDateCheck);

    result.power = parseFloat(value.power);

    result.email = this.parseContactInfo(value.email.replace(/\s+/g,''));
    result.phone = this.parseContactInfo(value.phone.replace(/\s+/g,''));
    return value;
  }

  parseDate(date: string): number {
    const temp = new Date(date);
    return temp.setHours(temp.getHours()+12);
  }

  parseContactInfo(arr: string): string[] {
    return arr.split(';');
  }

}