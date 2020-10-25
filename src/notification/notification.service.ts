import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { Notification } from './DBModels/notification.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { ReservedNumber } from './DBModels/reservedNumber.model';
import { Point } from '../point/DBModels/point.model';
import { User } from '../user/user.model';
import { UpdateNotificationDto } from './dto/updateNotification.dto';


interface FindOldReservedNumberOption {
  isActive: boolean
}

@Injectable()
export class NotificationService {

  constructor(
    @InjectModel('Notification') private notifyModel: Model<Notification>,
    @InjectModel('ReservedNumber') private reservedNumberModel: Model<ReservedNumber>,
    @InjectModel('Point') private pointModel: Model<Point>,
    @InjectModel('User') private userModel: Model<User> )
   {
  }

  async createNotification(createNotifyDTO: CreateNotificationDto): Promise<Notification> {
    try {
      const notification = await new this.notifyModel(createNotifyDTO).save();
      await this.saveNotificationInPoint(notification.points, notification._id);
      await this.reservedNumberModel.deleteOne({number: notification.number});
      return await this.notifyModel.findById(notification.id)
        .populate([
          {path: 'head', select: ['firstName', 'lastName', 'thirdName', '_id']},
          {
            path: 'from',
            select: ['firstName', 'lastName', 'thirdName', '_id'],
            populate: [
              {path: 'position'},
              {path: 'department'}
            ]
          },
          {path: 'points'}]);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateNotification(updateNotificationDTO: UpdateNotificationDto): Promise<Notification> {
    try {
      const notifyModel = new this.notifyModel(updateNotificationDTO);
      const updatedNotify = await this.notifyModel.findOneAndUpdate({
        _id: updateNotificationDTO._id
      },
        notifyModel,
        {new: true}).populate([
        {path: 'head', select: ['firstName', 'lastName', 'thirdName', '_id']},
        {
          path: 'from',
          select: ['firstName', 'lastName', 'thirdName', '_id'],
          populate: [
            {path: 'position'},
            {path: 'department'}
          ]
        },
        {path: 'points'}]);
      return updatedNotify;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }



  async findReservedNumbers(options: FindOldReservedNumberOption): Promise<ReservedNumber[]> {
      const keyParams = options.isActive?"$gt":"$lt";
      const result = await this.reservedNumberModel
        .find({
          dateAt: {[keyParams]: this.getDateOffsetHour(8)}}
        )
        .sort({
          number: 1
        });
      return result || [];
  }

  async generateNewNumber(): Promise<number> {
    let objWithNumberField: ReservedNumber[] | Notification[];

    const activeReservedNumber = await this.findReservedNumbers({
      isActive: true
    });

    if (activeReservedNumber.length !== 0) {
      objWithNumberField = activeReservedNumber;
    } else {
      objWithNumberField = await this.findLastNotification();
    }

    if (objWithNumberField.length !== 0) {
      return this.calculateNextNumber(objWithNumberField[0]);
    } else {
      return 1;
    }

  }

  async findLastNotification(): Promise<Notification[]> {
    const notifys = await this.notifyModel.aggregate([
      {$sort: {number: -1}},
      {$limit: 5},
      {$project: {number: 1}}
    ]);
    return notifys || [];
  }

  calculateNextNumber(obj: ReservedNumber | Notification ): number {
    return obj.number+1;
  }

  async reservedNumber(nextNumber: number) {
    await new this.reservedNumberModel({number: nextNumber}).save();
  }


  async saveNotificationInPoint(arrayPoints: Schema.Types.ObjectId[], notifyId: Schema.Types.ObjectId) {
    for (const point of arrayPoints) {
      const result = await this.pointModel.findByIdAndUpdate(point, {notification: notifyId});
    }
  }

  getDateOffsetHour(hour: number): Date {
    const nowDate = new Date();
    return new Date(nowDate.setHours(nowDate.getHours()-hour));
  }

  async findNotificationByPointID(pointID: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const notify = await this.notifyModel.findOne({'points':
        {$in: [pointID]}
    })
      .populate([
        {path: 'points'},
        {path: 'head', select: ['firstName', 'lastName', 'thirdName', '_id']},
      ])
      .lean();

    if (!notify) {
      return
    }

    const {password, username, permissions, ...from} = await this.userModel.findById(notify.from)
      .populate('department')
      .populate('position')
      .lean();
    return Object.assign({}, notify, {from});




    return notify;
  }

}
