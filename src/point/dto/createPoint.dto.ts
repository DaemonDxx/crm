import { IPointInterface } from '../interfaces/IPoint.interface';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreatePointDto implements IPointInterface {

  @IsNotEmpty({
    message: "Не указан адрес точки"
  })
  address: string;

  @IsNotEmpty({
    message: "Не указан РЭС"
  })
  area: string;

  @IsNotEmpty({
    message: "Не указан договор"
  })
  contract: string;

  @IsDate({
    message: "Неверный формат даты"
  })
  @IsNotEmpty({
    message: "Не указана дата проверки"
  })
  dateCheck: Date;

  email: string[];

  @IsDate({
    message: "Неверный формат даты"
  })
  lastDateCheck: Date;

  @IsNotEmpty({
    message: "Не указано имя точки"
  })
  name: string;

  numberContract: string;

  @IsNotEmpty({
    message: "Не указан номер прибора учета"
  })
  numberDevice: string;

  @IsNotEmpty({
    message: "Не указано описание точки учета"
  })
  objectDescription: string;

  phone: string[];

  @IsNotEmpty({
    message: "Не указан код точки учета"
  })
  pointNumber: string;
  
  power: number;

}