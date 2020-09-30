import { IStorage } from './interfaces/storage.interface';
import { FileLink } from './interfaces/fileLink.interface';
import { ITemplate } from '../Template/interface/ITemplate';
import { LocalStorageOptions } from './interfaces/localStorage.options.interface';
import { asyncReadFile, asyncSaveFile } from '../common/fsAsyncFuncrion';
import * as path from "path";
import { NameGenerator } from '../NameGenerator/nameGenerator.interface';
import { SimpleNameGenerator } from '../NameGenerator/SimpleNameGenerator';

class LocalhostStorage implements IStorage {

  pathTemplate: string
  pathSaveIn: string
  nameGenerator: NameGenerator

  constructor(options: LocalStorageOptions) {
    this.pathSaveIn = options.pathSaveIn;
    this.pathTemplate = options.pathTemplate;
    this.nameGenerator = new SimpleNameGenerator();
  }

  public async readFile(link: FileLink): Promise<Buffer> {
    const buffer = await asyncReadFile(path.join(this.pathTemplate, link.id));
    return buffer;
  }

  public async saveFile(reportBuffer: Buffer, template: ITemplate): Promise<FileLink> {
    const filename = this.nameGenerator.generateName(template);
    await asyncSaveFile(path.join(this.pathSaveIn, filename), reportBuffer);
    //todo добавить хэш функцию
    return {id: filename, hash: ''};
  }

  public getLinkByTemplate(filename: string): FileLink {
    return {id: filename, hash: ''};
  }

}

export {LocalhostStorage}