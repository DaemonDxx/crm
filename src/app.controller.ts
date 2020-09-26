import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {DOCXReportDriver} from './report/Driver/DOCXReportDriver';
import {NotificationPhoneTemplate} from './report/Template/NotificationPhoneTemplate';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService) {}



}
