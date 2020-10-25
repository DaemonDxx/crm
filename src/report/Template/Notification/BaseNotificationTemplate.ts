
import { INotificationInterface } from '../../../notification/interfaces/INotification.interface';
import * as moment from 'moment';
import { BaseTemplate } from '../BaseTemplate';
import { GetFullNameUser } from '../../common/GetFullNameUserFunction';
import { Get } from '@nestjs/common';

class BaseNotificationTemplate extends BaseTemplate{

  data: any
  templateFileName: string
  buffer: Buffer
  fileNamePrefix: string


  constructor(data: INotificationInterface) {
    super();
    this.typeFile = 'docx';
    this.templateFileName = 'notify-template.docx';
    this.data = {};
    this.dataTransform(data);
  }

  dataTransform(data: INotificationInterface) {
    this.data._id = data._id;
    this.data.dateSend = moment(data.dateSend).format('DD.MM.YYYY');
    this.data.number = data.number;
    this.data.from = `${data.from.position.description} ${data.from.department.shortName} ${GetFullNameUser(data.from)}`;
    this.data.nameOrg = data.points[0].name;
    this.data.head = data.head?`${GetFullNameUser(data.head)}`:'';
    this.data.typePlan = data.typePlan === 'planned'?'плановая':'внеплановая';
    this.data.name = data.points[0].name;
    this.data.points = data.points.map((item) => {return {
      address: item.address,
      dataCheck: moment(new Date(item.dateCheck)).format('DD.MM.YYYY'),
      numberDevice: item.numberDevice
    }});
  }

  generateFileNamePrefix(notification: INotificationInterface): string {
    let prefix: string;
    const date = new Date(notification.dateSend);
    switch (notification.type) {
      case "phone" : prefix = "Т"; break;
      case "email" : prefix = "Е"; break;
      case "letter" : prefix = "П"; break;
    }

    return `Уведомление ${prefix}-${notification.number} от ${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
  }

  getMimeType(): string {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
}


export {BaseNotificationTemplate}