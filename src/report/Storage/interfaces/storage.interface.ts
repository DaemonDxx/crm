import { ITemplate } from '../../Template/interface/ITemplate';
import { ReadFileOptions } from '../localhost.storage';
import { NameGenerator } from '../../NameGenerator/nameGenerator.interface';


interface IStorage {

  nameGenerator: NameGenerator;

  saveFile(reportBuffer: Buffer, template: ITemplate): Promise<string>
  readFile(filename: string, options?: ReadFileOptions): Promise<Buffer>

}

export {IStorage}