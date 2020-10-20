import { IUserInterface } from '../../user/user.interface';
import { IPointInterface } from '../../point/interfaces/IPoint.interface';

export class UpdateNotificationDto {

  dateSend: Date;
  description: string;
  email: string[];
  from: IUserInterface;
  number: number;
  phone: string;
  points: IPointInterface[];
  status: string;
  time: string;
  to: string;
  type: string;
  _id: string;
  typePlan: string;
  head: IUserInterface;

}