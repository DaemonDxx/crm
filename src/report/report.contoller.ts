import { Controller, Get, Query, Res } from '@nestjs/common';
import {Response} from 'express';
import { FileReport } from './DBModels/fileReport.model';


@Controller('file')
class FileController {

  @Get()
  async getFile(@Query('link') link: string, @Res() res: Response): Promise<Buffer> {
    return
  }

  @Get('/link')
  async getLinkByIDModel(@Query('id') id): Promise<FileReport> {
    return
  }

}

export {FileController}