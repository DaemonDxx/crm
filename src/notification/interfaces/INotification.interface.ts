import { Prop } from '@nestjs/mongoose';
import { Schema } from "mongoose";
import { IUserInterface } from '../../user/user.interface';
import { IPointInterface } from '../../point/interfaces/IPoint.interface';


export interface INotificationInterface {
  _id: any
  points: IPointInterface[]
  type: string
  number: number
  phone: string
  email: string[]
  from: IUserInterface
  to: string
  time: string
  status: string
  description: string
  typePlan: string
  dateSend: Date
  head: IUserInterface
}