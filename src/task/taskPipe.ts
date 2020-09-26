import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { CreateTaskDto } from './createTask.dto';
import { ParseArray } from '../Utils/PipeFucntions/stringToArray.function';
import { ParseDate } from '../Utils/PipeFucntions/parseDate.functions';

export class TaskPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata): CreateTaskDto {
      const result = value;
      result.date = ParseDate(value.date);

      return result;
  }

}