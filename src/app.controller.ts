import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import PermissionList from './Utils/PermissionsList'
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from './Utils/permission.guard';
import { Permissions } from './Utils/permissions.decorator';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService) {}


  @Get()
  getHello(@Req() req): string[] {
    return PermissionList.getPermissionArray()
  }

}
