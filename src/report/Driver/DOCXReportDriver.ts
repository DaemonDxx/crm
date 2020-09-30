import docx from 'docx-templates';
import { ITemplate } from '../Template/interface/ITemplate';
import { IReportDriver } from './interface/IReportDriver';

class DOCXReportDriver implements IReportDriver{


  async generateReport(template: ITemplate): Promise<Buffer> {
    const reportBuffer = await docx({
        template: template.getBuffer(),
        data: template.getData(),
      cmdDelimiter: ['{','}']
      },
  );
    return Buffer.from(reportBuffer);
  }

}

export {DOCXReportDriver}