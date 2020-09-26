import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './createNotification.dto';
import { Notification } from './notification.model';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../Utils/permission.guard';
import { Permissions } from '../Utils/permissions.decorator';
import PermissionsList from '../Utils/PermissionsList';
import { NotifyPipe } from './notify.pipe';
import { not } from 'rxjs/internal-compatibility';
import { DOCXReportDriver } from '../report/Driver/DOCXReportDriver';
import { NotificationPhoneTemplate } from '../report/Template/NotificationPhoneTemplate';
import { INotificationInterface } from './INotification.interface';

@Controller('/notification')
export class NotificationController {

  constructor(private notifyService: NotificationService) {
  }


  @Post()
  @Permissions(PermissionsList.notification, PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(NotifyPipe)
  async createNotification(@Body() createNotifyDTO: CreateNotificationDto, @Req() req): Promise<Notification> {
    createNotifyDTO.from = req.user._id;
    const notification = await this.notifyService.createNotification(createNotifyDTO);
    return notification;
  }

  @Get('/')
  @Permissions(PermissionsList.creator, PermissionsList.notification)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  async getNotificationByPointID(@Query('pointID') pointId): Promise<any> {
    const notify = await this.notifyService.findNotificationByPointID(pointId);
    if (!notify) {
      return {notification: undefined}
    }
    return {notification: notify};
  }

  @Get('/number')
  @Permissions(PermissionsList.notification, PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  async numberReserved(): Promise<number> {
    const number = await this.notifyService.findOldReservedNumbers();
    if (!number) {
      return await this.notifyService.reservingNumber();
    }
    return number;
  }

  @Get('/test')
  async getHello(@Req() req): Promise<string> {
    const driver = new DOCXReportDriver();
    const n: INotificationInterface = await this.notifyService.findNotificationByPointID('5f49fda75d6ea732ed8535b6');
    await driver.setTemplate(new NotificationPhoneTemplate(n));
    const link = await driver.generateReport();
    return link;
  }

}
