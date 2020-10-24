import { Document } from 'mongoose';
import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';
import {Schema } from 'mongoose';

@SchemaDecorator()
export class Notification extends Document {

  @Prop({
    type: [{
      ref: 'Point',
      type: Schema.Types.ObjectId
    }]
  })
  points: Schema.Types.ObjectId[]

  @Prop({
    required: true,
    enum: ['email', 'phone', 'letter']
  })
  type: string

  @Prop({
    required: true,
    unique: true
  })
  number: number

  @Prop()
  phone: string

  @Prop()
  email: string[]

  @Prop({
    ref: 'User',
    required: true
  })
  from: Schema.Types.ObjectId

  @Prop()
  to: string

  @Prop({
    required:true,
    default: new Date()
  })
  dateSend: Date

  @Prop()
  time: string

  @Prop()
  fromEmail: string

  @Prop({
    enum: ['send', 'reject', 'none', 'transfer']
  })
  status: string

  @Prop()
  description: string

  @Prop({
    required: true,
    enum: ['planned', 'unplanned']
  })
  typePlan: string

  @Prop({
    required: true,
    ref: 'User'
  })
  head: Schema.Types.ObjectId
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
