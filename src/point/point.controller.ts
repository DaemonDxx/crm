import { Controller, Inject, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, MulterModule } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import * as fs from 'fs';

@Controller('point')
export class PointController {


}
