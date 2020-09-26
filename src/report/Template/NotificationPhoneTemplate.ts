import { BaseNotificationTemplate } from './BaseNotificationTemplate';
import { INotificationInterface } from '../../notification/INotification.interface';

class NotificationPhoneTemplate extends BaseNotificationTemplate {

  data: any
  path: string
  fileNamePrefix: string

  constructor(data: INotificationInterface) {
    super(data);
    this.dataTransform(data);
    this.path = 'notify-template.docx';
    this.fileNamePrefix = 'phone-notify-';
    this.data.title = 'Телефонограмма';
  }

  dataTransform(data: INotificationInterface) {
    super.dataTransform(data);
    this.data.to = data.to;
    this.data.phone = data.phone;
    this.data.time = data.time;
    this.data.type = data.type === 'phone';
  }

}

export {NotificationPhoneTemplate}