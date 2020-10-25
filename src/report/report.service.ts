import { Injectable } from '@nestjs/common';
import { ITemplate } from './Template/interface/ITemplate';
import { ServiceOptions } from './interfaces/service.options';
import { IStorage } from './Storage/interfaces/storage.interface';
import { LocalhostStorage } from './Storage/localhost.storage';
import { FactoryDrivers } from './Driver/FactoryDriver';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileReport } from './DBModels/fileReport.model';
import { DbService } from './db.service';

@Injectable()
export class ReportService {

  readonly factoryDriver: FactoryDrivers
  readonly storage: IStorage

  constructor(
    options: ServiceOptions,
    private readonly dbService?: DbService,

  ) {
    this.storage = this.factoryStorage(options.storage);
    this.factoryDriver = new FactoryDrivers();
  }

  async generateReport(template: ITemplate): Promise<FileReport> {
    const driver = this.factoryDriver.getDriver(template.typeFile);
    const bufferTemplate: Buffer = await this.getBufferTemplate(template.templateFileName);
    template.setBuffer(bufferTemplate);
    const reportBuffer: Buffer = await driver.generateReport(template);
    const filename: string = await this.storage.saveFile(reportBuffer, template);
    const fileReport = await this.dbService.createFileReport({
      filename,
      mimeType: template.getMimeType(),
      byModelID: template.getData()._id
    });
    return fileReport;
  }


  async getFile(fileReport: FileReport): Promise<Buffer> {
    return this.storage.readFile(fileReport.filename);
  }

  async getFileReportByModelID(id: string): Promise<FileReport[]> {
    const fileReports = await this.dbService.findFileReportsByModelID(id);
    return fileReports;
  }

  private async getBufferTemplate(filename: string): Promise<Buffer> {
    const buffer: Buffer = await this.storage.readFile(filename, {isTemplate: true});
    return buffer
  }

  private factoryStorage(options): IStorage {
    switch (options.type) {
      case 'LOCALHOST': return new LocalhostStorage(options.storageOptions); break;
    }
  }

}
