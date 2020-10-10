import { ITemplate } from './interface/ITemplate';

abstract class BaseTemplate implements ITemplate {

  buffer: Buffer;
  data: any;
  fileNamePrefix: string;
  fileName: string;
  typeFile: string;

  getData(): any {
    return this.data;
  }

  setBuffer(buffer: Buffer): void {
    this.buffer = buffer;
  }

  getBuffer(): Buffer {
    return this.buffer;
  }

  abstract getMimeType(): string
  abstract dataTransform(data: any)

}

export {BaseTemplate}