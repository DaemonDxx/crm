import { Schema } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export interface FileReportInterface {

  _id?: string
  filename: string
  dateCreate?: Date
  byModelID: string
  mimeType: string

}

