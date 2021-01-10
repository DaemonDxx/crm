import { IsEnum, IsNotEmpty } from 'class-validator';
import { ResultList } from '../interfaces/result.list';

export class CreateResultDto {

  @IsNotEmpty()
  pointID: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  @IsEnum(ResultList.getArray())
  result: string

}