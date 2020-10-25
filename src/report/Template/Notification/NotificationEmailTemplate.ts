import { BaseNotificationTemplate } from './BaseNotificationTemplate';
import { INotificationInterface } from '../../../notification/interfaces/INotification.interface';

class NotificationEmailTemplate extends BaseNotificationTemplate {

  data: any
  templateFileName: string
  fileNamePrefix: string

  constructor(data: INotificationInterface) {
    super(data);
    this.dataTransform(data);
    this.fileNamePrefix = this.generateFileNamePrefix(data);
    this.data.title = 'Уведомление';
  }

  dataTransform(data: INotificationInterface) {
    super.dataTransform(data);
    this.data.email = data.email;
    this.data.type = 'email';
  }


}