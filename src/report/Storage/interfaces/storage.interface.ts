import { ITemplate } from '../../Template/interface/ITemplate';
import { ReadFileOptions } from '../localhost.storage';


interface IStorage {

  saveFile(reportBuffer: Buffer, template: ITemplate): Promise<string>
  readFile(filename: string, options?: ReadFileOptions): Promise<Buffer>

}

export {IStorage}