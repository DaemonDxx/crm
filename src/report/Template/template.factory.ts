import { INotificationInterface } from '../../notification/interfaces/INotification.interface';
import { NotificationPhoneTemplate } from './NotificationPhoneTemplate';

export class TemplateFactory {

  static CreateNotificationTemplate(notification: INotificationInterface) {
    switch (notification.type) {
      case "phone": return new NotificationPhoneTemplate(notification);
    }

  }
}