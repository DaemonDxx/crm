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

  async findFileReportsByModelID(id: string): Promise<FileReport[]> {
    const fileReports: FileReport[] = await this.fileReportModel.find({byModelID: id});
    return fileReports;
  }

  async findByID(id: string): Promise<FileReport> {
    const file: FileReport = await this.fileReportModel.findById(id);
    return file;
  }


}