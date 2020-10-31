import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Point } from './DBModels/point.model';
import { CreatePointDto } from './dto/createPoint.dto';

@Injectable()
export class PointService {

  constructor(@InjectModel('Point') private pointModel: Model<Point>) {
  }

  async createPoint(createPointDTO: CreatePointDto): Promise<Point> {
    if (await this._hasDuplicate(createPointDTO)) {
      throw new Error(`Точка ${createPointDTO.numberDevice} на данную дату (${createPointDTO.dateCheck}) уже сохранена`);
    }
    const newPoint = this._createModel(createPointDTO);
    return this.pointModel.create(newPoint);
  }

  async _hasDuplicate(dto: CreatePointDto): Promise<boolean> {
    const points = await this.pointModel.find({numberDevice: dto.numberDevice});

    if (points.length !== 0) {
      for (const point of points) {
        if (point.dateCheck === dto.dateCheck) {
          return true;
        }
      }
    }

    return false;
  }

  _createModel(dto: CreatePointDto): Point {
    return new this.pointModel(dto);
  }

  async findPointsByDate(date: Date): Promise<Point[]> {
    const points = await this.pointModel.find({dateCheck: date})
      .populate('notification');
    return points;
  }

  async findPointByContract(contract: string): Promise<Point[]> {
    const points = await this.pointModel.find({numberContract: contract});
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
