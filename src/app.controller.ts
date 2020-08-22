import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import PermissionList from './Utils/PermissionsList'
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from './Utils/permission.guard';
import { Permissions } from './Utils/permissions.decorator';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  @Permissions(PermissionList.notification)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  getHello(@Req() req): string[] {
    return PermissionList.getPermissionArray()
  }

}
