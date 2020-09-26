import * as path from 'path'
import * as moment from 'moment';
import { IReportDriver } from './interface/IReportDriver';
import { ITemplate } from '../Template/interface/ITemplate';
import { asyncReadFile, asyncSaveFile } from '../common/fsAsyncFuncrion';


class BaseReportDriverToFile implements IReportDriver {

  template: ITemplate
  typeFile: string

  async generateReport(): Promise<string> {
   return '';
  }

  generateFilename(): string {
    const dateString = moment(new Date()).format('DD_MM_YYYY_HH.mm.ss')
    return `${this.template.fileNamePrefix}${dateString}.${this.typeFile}`;
  }


  async setTemplate(template: ITemplate) {
    this.template = template;
    this.template.setBuffer(await this.readTemplate());
  }

  async saveReport(buffer: Uint8Array): Promise<string> {
    try {
      const filename = this.generateFilename();
      await asyncSaveFile(path.join('./reports/', filename), buffer);
      return filename;
    } catch (e) {
      console.log(e);
    }
    return undefined
  }

  private async readTemplate(): Promise<Buffer> {
    try {
      const buffer = await asyncReadFile(path.join('./templates/', this.template.path));
      return buffer
    } catch (e) {
      console.log(e);
      return undefined
    }
  }


}

export {BaseReportDriverToFile};