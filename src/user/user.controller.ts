import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserInfo(@Req() req): Promise<any> {
    const {password, ...res} = await this.userService.findUserByID(req.user._id);
    return res;
  }


  @Get('/department')
  @UseGuards(AuthGuard('jwt'))
  async getAllUserInDepartment (@Req() req): Promise<any> {
    return this.userService.findAllUsersInDepartment(req.user.department._id);
  }



}
