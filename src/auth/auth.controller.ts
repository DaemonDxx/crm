import { BadRequestException, Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { User } from '../user/user.model';
import { CreateUserDto } from './createUser.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  //Todo сделать pipe на трансформацию логина и пароля
  @Post('/signup')
  async signup(@Body() createUserDTO: CreateUserDto): Promise<any> {
    try {
      await this.userService.createUser(createUserDTO);
      return {ok: true}

    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  //Todo сделать pipe на трансформацию логина и пароля

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req):Promise<any> {
    return this.authService.login(req.user);
  }

}
