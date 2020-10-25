import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {DOCXReportDriver} from './report/Driver/DOCXReportDriver';
import {NotificationPhoneTemplate} from './report/Template/Notification/NotificationPhoneTemplate';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    @InjectQueue("report") private reportQueue: Queue
  ) {
  }

  @Get("/test")
  async test() {
    await this.reportQueue.add("notification", {test: "test"});
  }



}
