import { ITemplate } from '../../Template/interface/ITemplate';
import { FileLink } from './fileLink.interface';

interface IStorage {

  saveFile(reportBuffer: Buffer, template: ITemplate): Promise<FileLink>
  readFile(link: FileLink): Promise<Buffer>
  getLinkByTemplate(filename: string): FileLink

}

export {IStorage}