import { Body, Controller, Get, Post,  UseGuards, UsePipes } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './createNotification.dto';
import { Notification } from './notification.model';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../Utils/permission.guard';
import { Permissions } from '../Utils/permissions.decorator';
import PermissionsList from '../Utils/PermissionsList';
import { NotifyPipe } from './notify.pipe';

@Controller('notification')
export class NotificationController {

  constructor(private notifyService: NotificationService) {
  }


  @Post()
  @Permissions(PermissionsList.notification, PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(NotifyPipe)
  async createNotification(@Body() createNotifyDTO: CreateNotificationDto): Promise<Notification> {
    const notification = await this.notifyService.createNotification(createNotifyDTO);
    return notification;
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

}
