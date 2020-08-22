import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import PermissionList from  './PermissionsList'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string[] {
    const list: PermissionList = new PermissionList();
    return new PermissionList().getPermissionArray()
  }
}
