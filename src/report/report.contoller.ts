import { Controller, Get, Query, Res } from '@nestjs/common';
import {Response} from 'express';


@Controller('file')
class FileController {

  @Get()
  async getFile(@Query('link') link: string, @Res() res: Response): Promise<Buffer> {
    return
  }

}

export {FileController}