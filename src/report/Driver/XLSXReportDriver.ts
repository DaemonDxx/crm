import { ITemplate } from '../Template/interface/ITemplate';
import { BaseReportDriverToFile } from './BaseReportDriverToFile';
import * as xlsx from 'xlsx-template';

class XLSXReportDriver extends BaseReportDriverToFile{

  template: ITemplate
  typeFile: string

  constructor() {
    super();
    this.typeFile = 'xlsx';
  }

  async generateReport(): Promise<string> {
    // @ts-ignore
    const t = new xlsx(this.template.getBuffer());
    t.substitute(1, this.template.getData());
    const filename = await super.saveReport(t.generate({type: 'uint8array'}));
    return filename;
  }

}

export {XLSXReportDriver}