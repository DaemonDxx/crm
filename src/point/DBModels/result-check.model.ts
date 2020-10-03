import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { ResultList } from '../interfaces/result.list';

@SchemaDecorator()
export class ResultCheck extends Document {

  @Prop()
  description: string

  @Prop({
    required: true,
    enum: ResultList.getArray()
  })
  result: string

}

export const ResultCheckSchema = SchemaFactory.createForClass(ResultCheck);