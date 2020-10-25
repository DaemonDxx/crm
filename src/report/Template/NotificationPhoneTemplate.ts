import { BaseNotificationTemplate } from './BaseNotificationTemplate';
import { INotificationInterface } from '../../notification/interfaces/INotification.interface';

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

  generateFileNamePrefix(notification: INotificationInterface): string {
    let prefix: string;
    switch (notification.type) {
      case "phone" : prefix = "Т"; break;
      case "email" : prefix = "Е"; break;
      case "letter" : prefix = "П"; break;
    }
    return `Уведомление ${prefix}-${notification.number} от ${notification.dateSend}`
  }

}

export {NotificationPhoneTemplate}