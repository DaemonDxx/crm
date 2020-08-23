import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { ResultList } from './result.list';

@SchemaDecorator()
export class ResultCheck extends Document {

  @Prop({
    ref: 'Point',
    required: true
  })
  point: Schema.Types.ObjectId

  @Prop({
    ref: 'Task',
    required: true
  })
  task: Schema.Types.ObjectId

  @Prop()
  description: string

  @Prop({
    required: true,
    enum: ResultList.getArray()
  })
  result: string

  @Prop()
  sumSteals: number

  @Prop({
    enum: ['Первичный', 'Повторный']
  })
  dont: string
}

export const ResultCheckSchema = SchemaFactory.createForClass(ResultCheck);