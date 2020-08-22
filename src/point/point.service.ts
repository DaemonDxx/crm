import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Point } from './point.model';
import { CreatePointDto } from './createPoint.dto';

@Injectable()
export class PointService {

  constructor(@InjectModel('Point') private pointModel: Model<Point>) {
  }

  async createPoint(createPointDTO: CreatePointDto): Promise<Point> {
    const points = await this.pointModel.find({numberDevice: createPointDTO.numberDevice}).lean();

    if (points) {
      for (const point of points) {
        if (point.dateCheck === createPointDTO.dateCheck) {
          throw new BadRequestException(`Точка задвоена ${point.numberDevice}`)
        }
      }
    }

    return new this.pointModel(createPointDTO).save();

  }



}
