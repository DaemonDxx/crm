interface ITemplate {

  readonly templateFileName: string
  data: any
  buffer: Buffer
  readonly fileNamePrefix: string
  readonly typeFile: string

  dataTransform(data: any)
  getData(): any
  setBuffer(buffer: Buffer): void
  getBuffer(): Buffer
  getMimeType(): string

}

export {ITemplate}