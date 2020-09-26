import { ITemplate } from '../../Template/interface/ITemplate';

interface IReportDriver {

  typeFile: string

  generateReport(): Promise<string>;
  generateFilename(): string;
  setTemplate(template: ITemplate);

}

export {IReportDriver}