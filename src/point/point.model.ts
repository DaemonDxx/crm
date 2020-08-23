import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import Area from '../Utils/area.list';


@SchemaDecorator()
export class Point extends Document {

  @Prop({
    required: true,
    enum: Area,
  })
  area: string;

  @Prop({
    required: true,
  })
  contract: string;

  @Prop({
    required: true,
  })
  numberContract: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  objectDescription: string;

  @Prop({
    required: true,
  })
  address: string;

  @Prop({
    required: true,
  })
  pointNumber: string;

  @Prop({
    required: true,
  })
  dateCheck: Date;

  @Prop({
    required: true,
  })
  power: number;

  @Prop()
  email: string[];

  @Prop()
  phone: string[];

  @Prop()
  lastDateCheck: Date;

  @Prop({
    required: true
  })
  numberDevice: string

  @Prop({
    ref: 'Notification'
  })
  notification: Schema.Types.ObjectId

}


export const PointSchema = SchemaFactory.createForClass(Point);