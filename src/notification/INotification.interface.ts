import { Prop } from '@nestjs/mongoose';
import { Schema } from "mongoose";


export interface INotificationInterface {
  _id: string
  points: string[]
  type: string
  number: number
  phone: string
  email: string[]
  from: string
  to: string
  dateSend: Date
  time: string
  fromEmail: string
  status: string
  description: string

}