import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Point } from './DBModels/point.model';
import { CreatePointDto } from './dto/createPoint.dto';

@Injectable()
export class PointService {

  constructor(@InjectModel('Point') private pointModel: Model<Point>
              ) {
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

    try {
      return await new this.pointModel(createPointDTO).save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }


  }

  async findPointsByDate(date: Date): Promise<any> {
    const points = await this.pointModel.find({dateCheck: date})
      .populate('notification')
      .lean();
    return points;
  }

  async findPointByName(name: string): Promise<any> {
    const points = await this.pointModel.find({name, notification: {$exists: false}}).lean();
    return points;
  }

  async findPointByID(pointID: string): Promise<Point> {
    const point = await this.pointModel.findById(pointID);
    return point;
  }

  async updatePoint(point: Point): Promise<Point> {
    const updatePoint = await this.pointModel.findOneAndUpdate({_id: point.id}, point);
    return updatePoint;
  }


}
