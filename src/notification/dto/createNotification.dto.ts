import { INotificationInterface } from '../interfaces/INotification.interface';
import { IUserInterface } from '../../user/user.interface';
import { IPointInterface } from '../../point/interfaces/IPoint.interface';


export class CreateNotificationDto implements INotificationInterface {

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