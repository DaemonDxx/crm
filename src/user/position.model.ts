import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@SchemaDecorator()
export class Position extends Document{

  @Prop({
    required: true
  })
  title: string

  @Prop({
    required: true
  })
  description: string

}

export const PositionSchema = SchemaFactory.createForClass(Position)