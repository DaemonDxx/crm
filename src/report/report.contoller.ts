import { BadRequestException, Controller, Get, Query, Res } from '@nestjs/common';
import {Response} from 'express';
import { FileReport } from './DBModels/fileReport.model';
import { ReportService } from './report.service';
import { DbService } from './db.service';


@Controller('file')
class FileController {

  constructor(private readonly reportService: ReportService,
              private readonly dbService: DbService
  ) {
  }

  @Get()
  async getFile(@Query('link') link: string, @Res() res: Response) {
    const fileReport = await this.dbService.findByID(link);
    if (!fileReport) {
      throw new BadRequestException({}, 'Данного файла не существует');
    }
    const buffer = await this.reportService.getFile(fileReport);
    res.header('Content-Type', fileReport.mimeType);
    res.end(buffer);
  }

  @Get('/link')
  async getLinkByIDModel(@Query('id') id): Promise<FileReport> {
    const file: FileReport = await this.reportService.getFileReportByModelID(id);
    if (file) {
      return file;
    }
    throw new BadRequestException({}, 'Файла для данной модели не существует');
  }

}

export {FileController}