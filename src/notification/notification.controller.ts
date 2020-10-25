import {
  Body,
  Controller,
  Get,
  Post, Put,
  Query,
  Req, Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { Notification } from './DBModels/notification.model';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../Utils/permission.guard';
import { Permissions } from '../Utils/permissions.decorator';
import PermissionsList from '../Utils/PermissionsList';
import { NotifyPipe } from './notify.pipe';
import { NotificationPhoneTemplate } from '../report/Template/Notification/NotificationPhoneTemplate';
import { ReportService } from '../report/report.service';
import { FileReport } from '../report/DBModels/fileReport.model';
import { UpdateNotificationDto } from './dto/updateNotification.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';


@Controller('/notification')
export class NotificationController {

  constructor(private notifyService: NotificationService,
              private readonly reportService: ReportService,
              @InjectQueue("report") private reportQueue: Queue
              ) {
  }


  @Post()
  @Permissions(PermissionsList.notification, PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  async createNotification(@Body() createNotifyDTO: CreateNotificationDto, @Req() req): Promise<Notification> {
    createNotifyDTO.from = req.user._id;
    createNotifyDTO.dateSend = new Date();
    const notification = await this.notifyService.createNotification(createNotifyDTO);
    await this.reportQueue.add("notification", notification);
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

  @Put()
  @Permissions(PermissionsList.creator, PermissionsList.notification)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  async updateNotification(@Body() updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const updatedNotify = await this.notifyService.updateNotification(updateNotificationDto);
    return updatedNotify;
  }

  @Get('/number')
  @Permissions(PermissionsList.notification, PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  async numberReserved(): Promise<number> {
    let nextNumber: number;

    const oldNumber = await this.notifyService.findReservedNumbers({
      isActive: false
    });

    if (oldNumber.length !== 0) {
       nextNumber = oldNumber[0].number;
    } else {
      nextNumber = await this.notifyService.generateNewNumber();
    }

    await this.notifyService.reservedNumber(nextNumber);
    return nextNumber;
  }

  @Get('/test')
  async test(): Promise<FileReport> {
    const notify = await this.notifyService.findNotificationByPointID('5f49fda55d6ea732ed853571');
    const file: FileReport = await this.reportService.generateReport(new NotificationPhoneTemplate(notify));
    console.log(file);
    return file;
  }


}
