import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { InviteService } from '../invite/invite.service';
import { InviteModule } from '../invite/invite.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [InviteModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
