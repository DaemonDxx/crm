import { ITemplate } from './interface/ITemplate';

class BaseTemplate implements ITemplate {

  buffer: Buffer;
  data: any;
  fileNamePrefix: string;
  path: string;

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

  getBuffer(): Buffer {
    return this.buffer;
  }

  setBuffer(buffer: Buffer) {
    this.buffer = buffer;
  }

}

export {BaseTemplate}