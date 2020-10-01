import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@SchemaDecorator()
export class FileReport extends Document {

  @Prop({
    required: true
  })
  filename: string

  @Prop({
    required: true,
    default: new Date()
  })
  dateCreate: Date

  @Prop({
    required: true
  })
  byModelID: string

  @Prop({
    required: true
  })
  mimeType: string

}

export const FileReportSchema = SchemaFactory.createForClass(FileReport);