interface ITemplate {

  fileName: string
  data: any
  buffer: Buffer
  fileNamePrefix: string
  typeFile: string

  dataTransform(data: any)
  getData(): any
  setBuffer(buffer: Buffer): void
  getBuffer(): Buffer

}

export {ITemplate}