import { Prop } from '@nestjs/mongoose';
import Area from '../Utils/area.list';

export interface IPointInterface {

  area: string;
  contract: string;
  numberContract: string;
  name: string;
  objectDescription: string;
  address: string;
  pointNumber: string;
  dateCheck: Date;
  power: number;
  email: string[];
  phone: string[];
  lastDateCheck: Date;
  numberDevice: string;
}