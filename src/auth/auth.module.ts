import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { InviteService } from '../invite/invite.service';
import { InviteModule } from '../invite/invite.module';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    InviteModule,
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    //Todo Добавить взятие настроек из конфигов
    JwtModule.register({
      secret: process.env.JWT_KEY || '1',
      signOptions: {expiresIn: '7d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
