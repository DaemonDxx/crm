import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './createNotification.dto';
import { Notification } from './notification.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservedNumber } from './reservedNumber.model';
import { retrieveCols } from '@nestjs/cli/actions';

@Injectable()
export class NotificationService {

  constructor(
    @InjectModel('Notification') private notifyModel: Model<Notification>,
    @InjectModel('ReservedNumber') private reservedNumberModel: Model<ReservedNumber>
  ) {
  }

  async createNotification(createNotifyDTO: CreateNotificationDto): Promise<Notification> {
    try {
      const {_id, number, ...query} = createNotifyDTO;

      //Todo С этим нужно что то сделать

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const notification = await this.notifyModel.findOneAndUpdate({number: number}, query, {upsert: true, new: true});
      await this.reservedNumberModel.deleteOne({number: notification.number});
      return notification;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOldReservedNumbers(): Promise<number> {
    try {
      const result = await this.reservedNumberModel.find({dateAt: {$lt: this.getDateOffsetHour(8)}}).sort({number: 1});
      if (result.length === 0) {
        return 0;
      }
      result[0].dateAt = new Date();
      const updateReservedNumbers = await result[0].save();
      return updateReservedNumbers.number;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async reservingNumber(): Promise<number> {
    const aggregateOptions = [
      {$sort: {number: -1}},
      {$limit: 1},
      {$project: {_id: 0, number: 1}}
    ];
    try {
      const reservedNumber = await this.reservedNumberModel.find({dateAt: {$gt: this.getDateOffsetHour(8)}}).sort({number: 1});

      const result = await (reservedNumber? this.reservedNumberModel.aggregate(aggregateOptions): this.notifyModel.aggregate(aggregateOptions));

      const nextNumber = parseInt(result[0].number)+1;
      const reservingNumber = await new this.reservedNumberModel({number: nextNumber}).save();

      return nextNumber;
    } catch (e) {
      throw new BadRequestException(e.message);
    }

  }

  getDateOffsetHour(hour: number): Date {
    const nowDate = new Date();
    return new Date(nowDate.setHours(nowDate.getHours()-hour));
  }

}
