import { NameGenerator } from './nameGenerator.interface';
import { ITemplate } from '../Template/interface/ITemplate';

class SimpleNameGenerator implements NameGenerator {
  generateName(template: ITemplate): string {
    return `${template.fileName}test.${template.typeFile}`;
  }

}

export {SimpleNameGenerator}