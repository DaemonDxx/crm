import { IPointInterface } from '../interfaces/IPoint.interface';

export class CreatePointDto implements IPointInterface {
  address: string;
  area: string;
  contract: string;
  dateCheck: Date;
  email: string[];
  lastDateCheck: Date;
  name: string;
  numberContract: string;
  numberDevice: string;
  objectDescription: string;
  phone: string[];
  pointNumber: string;
  power: number;

}