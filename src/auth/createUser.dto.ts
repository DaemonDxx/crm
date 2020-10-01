import { Prop } from '@nestjs/mongoose';
import { Schema } from "mongoose";
import { Invite } from '../invite/DBModels/invite.model';
import { Position } from '../user/position.model';

export class CreateUserDto {

  firstName: string

  lastName: string

  thirdName: string

  username: string

  password: string

  position: string

  invite: string

}