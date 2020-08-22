import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentSchema } from './department.model';
import { Position, PositionSchema } from './position.model';
import { UserSchema } from './user.model';
import { InviteModule } from '../invite/invite.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Department', schema: DepartmentSchema},
      {name: 'Position', schema: PositionSchema},
      {name: 'User', schema: UserSchema}
    ]),
    InviteModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
