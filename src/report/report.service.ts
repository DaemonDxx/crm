import { Injectable } from '@nestjs/common';
import { ITemplate } from './Template/interface/ITemplate';
import { ServiceOptions } from './service.options';
import { IStorage } from './Storage/interfaces/storage.interface';
import { LocalhostStorage } from './Storage/localhost.storage';
import { FactoryDrivers } from './Driver/FactoryDriver';
import { FileLink } from './Storage/interfaces/fileLink.interface';

@Injectable()
export class ReportService {

  factoryDriver: FactoryDrivers
  storage: IStorage

  constructor(options: ServiceOptions) {
    this.storage = this.factoryStorage(options.storage);
    this.factoryDriver = new FactoryDrivers();
  }

  async generateReport(template: ITemplate): Promise<FileLink> {
    const bufferTemplate: Buffer = await this.getBufferTemplate(template.fileName);
    const driver = this.factoryDriver.getDriver(template.typeFile);
    template.setBuffer(bufferTemplate);
    const reportBuffer: Buffer = await driver.generateReport(template);
    const fileLink: FileLink = await this.storage.saveFile(reportBuffer, template);
    return fileLink;
  }

  private async getBufferTemplate(filename: string): Promise<Buffer> {
    const fileLink: FileLink = this.storage.getLinkByTemplate(filename);
    const buffer: Buffer = await this.storage.readFile(fileLink);
    return buffer
  }

  private factoryStorage(options): IStorage {
    switch (options.type) {
      case 'LOCALHOST': return new LocalhostStorage(options.storageOptions); break;
    }
  }

}
