import { INotificationInterface } from '../../notification/interfaces/INotification.interface';
import { NotificationPhoneTemplate } from './NotificationPhoneTemplate';
import { ITemplate } from './interface/ITemplate';

export class TemplateFactory {

  static CreateNotificationTemplate(notification: INotificationInterface): ITemplate {
    switch (notification.type) {
      case "phone": return new NotificationPhoneTemplate(notification);
    }

  }
}