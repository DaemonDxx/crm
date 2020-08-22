import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async login(user: any) {
    const {password, ...result}  = user._doc;
    return {
      access_token: this.jwtService.sign({username: result.username, UID: result._id}),
      user: result
    }
  }


}
