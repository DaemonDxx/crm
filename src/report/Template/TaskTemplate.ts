import * as moment from 'moment';
import { ITaskInterface } from '../../task/task.interface';
import { BaseTemplate } from './BaseTemplate';
import { GetFullNameUser } from '../common/GetFullNameUserFunction';


class TaskTemplate extends BaseTemplate{

  buffer: Buffer;
  data: any;
  fileNamePrefix: string;
  fileName: string;

  constructor(task: ITaskInterface) {
    super();
    this.dataTransform(task);
    this.fileName = 'task-template.xlsx';
    this.fileNamePrefix = 'task-';
    this.typeFile = 'xlsx';
  }

  dataTransform(task: ITaskInterface) {
    this.data.head = GetFullNameUser(task.head);
    this.data.members = task.members.map((user) => {return GetFullNameUser(user)});
    if (this.data.members.length === 1) {
      this.data.members.push('');
    }
    this.data.date = moment(task.points[0].dateCheck).format('DD.MM.YYYY');
    this.data.points = task.points;

  }

  getMimeType(): string {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }

}

export {TaskTemplate}