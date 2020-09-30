import { ITemplate } from '../Template/interface/ITemplate';
import * as xlsx from 'xlsx-template';
import { IReportDriver } from './interface/IReportDriver';

class XLSXReportDriver implements IReportDriver{


  async generateReport(template: ITemplate): Promise<Buffer> {
    // @ts-ignore
    const t = new xlsx(this.template.getBuffer());
    t.substitute(1, template.getData());
    const array: Uint8Array = await t.generate({type: 'uint8array'});
    return Buffer.from(array);
  }

}

export {XLSXReportDriver}