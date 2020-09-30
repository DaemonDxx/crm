import { ITemplate } from '../Template/interface/ITemplate';

interface NameGenerator {

  generateName(template: ITemplate): string

}


export {NameGenerator}