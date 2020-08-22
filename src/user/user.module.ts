import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentSchema } from './department.model';
import { PositionModel, PositionSchema } from './position.model';
import { UserSchema } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Department', schema: DepartmentSchema},
      {name: 'Position', schema: PositionSchema},
      {name: 'User', schema: UserSchema}
    ])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
