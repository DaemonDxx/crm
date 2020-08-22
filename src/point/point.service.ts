import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Point } from './point.model';

@Injectable()
export class PointService {

  constructor(@InjectModel('Point') private pointModel: Model<Point>) {
  }
  


}
