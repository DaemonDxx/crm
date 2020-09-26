import { Prop } from '@nestjs/mongoose';
import { Schema } from "mongoose";
import { IUserInterface } from '../user/user.interface';
import { IPointInterface } from '../point/IPoint.interface';


export interface INotificationInterface {
  _id: string
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