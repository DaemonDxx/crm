import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { ReportService } from './report.service';
import { Job } from 'bull';
import { INotificationInterface } from '../notification/interfaces/INotification.interface';
import { ITemplate } from './Template/interface/ITemplate';
import { TemplateFactory } from './Template/template.factory';

@Processor('report')
export class ConsumerService {

  constructor(private readonly reportService: ReportService) {
  }

  @Process("notification")
  async generateNotificationReport(job: Job<INotificationInterface>) {
      try {
        const template: ITemplate = TemplateFactory.CreateNotificationTemplate(job.data);
        const fileReport = await this.reportService.generateReport(template);
      } catch (e) {
        console.log(e);
      }
      await job.remove();
  }



}