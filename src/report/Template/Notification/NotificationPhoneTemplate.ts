import { BaseNotificationTemplate } from './BaseNotificationTemplate';
import { INotificationInterface } from '../../../notification/interfaces/INotification.interface';


class NotificationPhoneTemplate extends BaseNotificationTemplate {

  data: any
  templateFileName: string
  fileNamePrefix: string

  constructor(data: INotificationInterface) {
    super(data);
    this.dataTransform(data);
    this.fileNamePrefix = this.generateFileNamePrefix(data);
    this.data.title = 'Телефонограмма';
  }

  dataTransform(data: INotificationInterface) {
    super.dataTransform(data);
    this.data.to = data.to;
    this.data.phone = data.phone;
    this.data.time = data.time;
    this.data.type = 'phone';
  }


}

export {NotificationPhoneTemplate}