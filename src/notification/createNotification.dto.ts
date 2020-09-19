import { INotificationInterface } from './INotification.interface';


export class CreateNotificationDto implements INotificationInterface {

  dateSend: Date;
  description: string;
  email: string[];
  from: string;
  number: number;
  phone: string;
  points: string[];
  status: string;
  time: string;
  to: string;
  type: string;
  _id: string;
  typePlan: string;


}