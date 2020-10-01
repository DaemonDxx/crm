import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileReport } from './DBModels/fileReport.model';
import { FileReportInterface } from './Storage/interfaces/fileReport.interface';

@Injectable()
export class DbService {

  constructor(@InjectModel('fileReport') private fileReportModel: Model<FileReport>) {
  }

  async createFileReport(fileReport: FileReportInterface): Promise<FileReport> {
    const file: FileReport = await new this.fileReportModel(fileReport).save();
    return file;
  }


}