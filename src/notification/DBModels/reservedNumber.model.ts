import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ReservedNumber extends Document {

  @Prop({
    required:true,
    unique: true
  })
  number: number

  @Prop({
    required: true,
    default: new Date()
  })
  dateAt: Date

}

export const ReservedNumberSchema = SchemaFactory.createForClass(ReservedNumber);