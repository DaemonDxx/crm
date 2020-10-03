import * as _ from 'lodash'
import * as fs from 'fs'
import { IStorage } from './interfaces/storage.interface';
import { ITemplate } from '../Template/interface/ITemplate';
import { LocalStorageOptions } from './interfaces/localStorage.options.interface';
import { asyncReadFile, asyncSaveFile } from '../common/fsAsyncFuncrion';
import * as path from "path";
import { NameGenerator } from '../NameGenerator/nameGenerator.interface';
import { SimpleNameGenerator } from '../NameGenerator/SimpleNameGenerator';

interface ReadFileOptions {
  isTemplate: boolean
}

class LocalhostStorage implements IStorage {

  pathTemplate: string
  pathSaveIn: string
  nameGenerator: NameGenerator

  constructor(options: LocalStorageOptions) {
    if (!fs.existsSync(options.pathTemplate)) {
      throw new Error('Папки с шаблонами не существует');
    }
    this.pathSaveIn = options.pathSaveIn;
    this.pathTemplate = options.pathTemplate;
    this.nameGenerator = new SimpleNameGenerator();
  }

  public async readFile(filename:string, options?: ReadFileOptions): Promise<Buffer> {
    const pathRead = _.get(options, 'isTemplate')?this.pathTemplate:this.pathSaveIn;
    const buffer = await asyncReadFile(path.join(pathRead, filename));
    return buffer;
  }

  public async saveFile(reportBuffer: Buffer, template: ITemplate): Promise<string> {
    const filename = this.nameGenerator.generateName(template);
    await asyncSaveFile(path.join(this.pathSaveIn, filename), reportBuffer);
    return filename;
  }

}

export {LocalhostStorage, ReadFileOptions};