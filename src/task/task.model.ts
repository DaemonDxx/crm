import { Document, Schema } from 'mongoose';
import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';

@SchemaDecorator()
export class Task extends Document {

  @Prop({
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Point'
    }]
  })
  points: Schema.Types.ObjectId[]

  @Prop({
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  })
  members: Schema.Types.ObjectId[]

  @Prop({
    ref: 'User',
    required: true
  })
  head: Schema.Types.ObjectId

  @Prop({
    required: true,
    unique: true
  })
  number: number

  @Prop({
    required: true
  })
  date: Date

  @Prop({
    ref: 'Car'
  })
  car: Schema.Types.ObjectId

  @Prop({
    enum: ['working','done']
  })
  status: string

}

export const TaskSchema = SchemaFactory.createForClass(Task);