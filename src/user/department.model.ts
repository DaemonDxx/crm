import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class Department extends Document {

  @Prop({
    required: true
  })
  title: string

  @Prop({
    required: true
  })
  description: string

  @Prop({
    required: true
  })
  shortName: string

}

export const DepartmentSchema = SchemaFactory.createForClass(Department)
