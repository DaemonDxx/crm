import {Schema} from 'mongoose';

export class CreateTaskDto {

  _id: string
  points: Schema.Types.ObjectId[]
  head: Schema.Types.ObjectId
  number: number
  date: Date
  car: Schema.Types.ObjectId
  status: string
  members: Schema.Types.ObjectId[]

}