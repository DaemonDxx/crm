import { Document, Schema as SchemaT} from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import PermissionList from '../Utils/PermissionsList';

@Schema()
export class Invite extends Document {


  @Prop({
    default: Date.now()
  })
  dateAt: Date

  @Prop({
    ref: 'User',
    required: true
  })
  userFrom: SchemaT.Types.ObjectId

  @Prop({
    ref: 'User'
  })
  userCreated: SchemaT.Types.ObjectId

  @Prop({
    //ToDo Добавить validator на предмет совпадения permissions
    //enum: new PermissionList().getPermissionArray()
  })
  permissions: string[]

  @Prop({
    type: SchemaT.Types.ObjectId,
    required: true,
    ref: 'Department'
  })
  department: SchemaT.Types.ObjectId


}

export const InviteSchema = SchemaFactory.createForClass(Invite);