import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import PermissionList from  './PermissionsList'
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello(@Req() req): string[] {
    console.log(req.user);
    const list: PermissionList = new PermissionList();
    return new PermissionList().getPermissionArray()
  }
}
