interface ITemplate {

  path: string
  data: any
  buffer: Buffer
  fileNamePrefix: string

  dataTransform(data: any)
  getData(): any
  setBuffer(buffer: Buffer);
  getBuffer(): Buffer;

}

export {ITemplate}