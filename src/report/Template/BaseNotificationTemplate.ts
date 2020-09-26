
import { INotificationInterface } from '../../notification/INotification.interface';
import * as moment from 'moment';
import { BaseTemplate } from './BaseTemplate';
import { GetFullNameUser } from '../common/GetFullNameUserFunction';
import { Get } from '@nestjs/common';

class BaseNotificationTemplate extends BaseTemplate{

  data: any
  path: string
  buffer: Buffer
  fileNamePrefix: string


  constructor(data: INotificationInterface) {
    super();
    this.dataTransform(data);
  }

  dataTransform(data: INotificationInterface) {
    this.data.dateSend = moment(data.dateSend).format('DD.MM.YYYY');
    this.data.number = data.number;
    this.data.from = `${data.from.position.description} ${data.from.department.shortName} ${GetFullNameUser(data.from)}`;
    this.data.nameOrg = data.points[0].name;
    this.data.head = data.head?`${GetFullNameUser(data.head)}`:'';
    this.data.typePlan = data.typePlan === 'planed'?'плановая':'внеплановая';
    this.data.name = data.points[0].name;
    this.data.points = data.points.map((item) => {return {
      address: item.address,
      dataCheck: moment(new Date(item.dateCheck)).format('DD.MM.YYYY'),
      numberDevice: item.numberDevice
    }})
  }
}


export {BaseNotificationTemplate}