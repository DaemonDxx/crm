import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get('/positions')
  async getAllPosition(): Promise<any> {
    return this.userService.findAllPosition();
  }

}
