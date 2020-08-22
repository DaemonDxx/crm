import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';

@SchemaDecorator()
export class PositionModel {

  @Prop({
    required: true
  })
  title: string

  @Prop({
    required: true
  })
  description: string

}

export const PositionSchema = SchemaFactory.createForClass(PositionModel)