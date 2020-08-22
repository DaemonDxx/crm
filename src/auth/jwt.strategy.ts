import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      //Todo Добавить файл загрузку из концигов
      secretOrKey: process.env.JWT_KEY || '1'
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findUserByID(payload.UID);
    return user;
  }

}