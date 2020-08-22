import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './createNotification.dto';
import { Notification } from './notification.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService {

  constructor(@InjectModel('Notification') private notifyModel: Model<Notification>) {
  }

  async createNotification(createNotifyDTO: CreateNotificationDto): Promise<Notification> {
    try {
      const notification = await new this.notifyModel(createNotifyDTO);
      return await notification.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

}
