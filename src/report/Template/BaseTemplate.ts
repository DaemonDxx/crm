import { ITemplate } from './interface/ITemplate';

class BaseTemplate implements ITemplate {

  buffer: Buffer;
  data: any;
  fileNamePrefix: string;
  fileName: string;

  constructor() {
    this.data = {};
    this.data.members = [];
  }

  dataTransform(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }

  setBuffer(buffer: Buffer): void {
    this.buffer = buffer;
  }

  getBuffer(): Buffer {
    return this.buffer;
  }

  typeFile: string;


}

export {BaseTemplate}