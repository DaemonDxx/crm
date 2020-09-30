import { ITemplate } from '../../Template/interface/ITemplate';

interface IReportDriver {
  generateReport(template: ITemplate): Promise<Buffer>;
}

export {IReportDriver}