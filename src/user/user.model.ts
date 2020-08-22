import { Document, Schema } from 'mongoose';
import { Prop, SchemaFactory, Schema as SchemaDecorator } from '@nestjs/mongoose';
import PermissionList from '../Utils/PermissionsList';

@SchemaDecorator()
export class User extends Document {

  @Prop({
    required: true,
    maxlength: 15
  })
  firstName: string

  @Prop({
    required: true,
    maxlength: 15
  })
  lastName: string

  @Prop({
    required: true,
    maxlength: 15
  })
  thirdName: string

  @Prop({
    //Todo Добавить validator
    //enum: new PermissionList().getPermissionArray(),
    required: true
  })
  permissions: string[]

  @Prop({
    ref: 'Car'
  })
  car: Schema.Types.ObjectId

  @Prop({
    required: true,
    maxlength: 10,
    minlength: 6
  })
  username: string

  @Prop({
    required: true,
    minlength: 4
  })
  password: string

  @Prop({
    ref: 'Position',
    required: true
  })
  position: Schema.Types.ObjectId

  @Prop()
  emailWork: string

  @Prop()
  emailPersonal: string

  @Prop()
  telegram: string

  @Prop({
    ref: 'Department',
    required: true
  })
  department: Schema.Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User)