import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { User } from '../user/user.model';
import { CreateUserDto } from './createUser.dto';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {

  constructor(private userService: UserService) {
  }

  @Post('/signup')
  async signup(@Body() createUserDTO: CreateUserDto): Promise<User> {
    try {
      return await this.userService.createUser(createUserDTO);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

}
