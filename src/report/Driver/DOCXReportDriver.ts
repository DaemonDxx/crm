import docx from 'docx-templates';
import { ITemplate } from '../Template/interface/ITemplate';
import {BaseReportDriverToFile} from './BaseReportDriverToFile';

class DOCXReportDriver extends BaseReportDriverToFile {

  template: ITemplate
  typeFile: string

  constructor() {
    super();
    this.typeFile = 'docx';
  }

  async generateReport(): Promise<string> {
    const reportBuffer = await docx({
        template: this.template.getBuffer(),
        data: this.template.getData(),
      cmdDelimiter: ['{','}']
      },
  );
    const filename = await super.saveReport(reportBuffer);
    return filename;
  }

}

export {DOCXReportDriver}