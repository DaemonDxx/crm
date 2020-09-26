
import { IPointInterface } from '../point/IPoint.interface';
import { IUserInterface } from '../user/user.interface';

interface ITaskInterface {

  _id: string
  points: IPointInterface[]
  head: IUserInterface
  number: number
  date: Date
  car: any
  status: string
  members: IUserInterface[]

}

export {ITaskInterface};