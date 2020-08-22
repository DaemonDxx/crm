import { Module } from '@nestjs/common';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteSchema } from './invite.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Invite', schema: InviteSchema}
    ])
  ],
  controllers: [InviteController],
  providers: [InviteService],
  exports: [InviteService]
})
export class InviteModule {}