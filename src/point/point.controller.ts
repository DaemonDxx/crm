import { BadRequestException, Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CreatePointDto } from './dto/createPoint.dto';
import { PointService } from './point.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../Utils/permission.guard';
import PermissionsList from '../Utils/PermissionsList';
import { Permissions } from '../Utils/permissions.decorator';
import { CreatePointPipe } from './createPoint.pipe';
import {ParseDatePipe} from '../Utils/parseDate.pipe';
import { Point } from './DBModels/point.model';

@Controller('point')
export class PointController {

  constructor(private pointService: PointService) {
  }

  @Post()
  @Permissions(PermissionsList.point, PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(CreatePointPipe)
  async createPoint(@Body() createPointDTO: CreatePointDto): Promise<any> {
    try {
      const point = await this.pointService.createPoint(createPointDTO);

    } catch (e) {
      console.log(e.message);
      throw new BadRequestException(e.message);
    }
    return {}
  }


  @Get('/day')
  @Permissions(PermissionsList.point, PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes()
  async getAllPointForDay(@Query('date', ParseDatePipe) queryParam: any): Promise<any> {
      const res = await this.pointService.findPointsByDate(queryParam);
      return res;
  }

  @Get()
  @Permissions(PermissionsList.point, PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  async getPointsByName(@Query('name') name): Promise<any> {
    console.log(name);
    const points = await this.pointService.findPointByName(name);
    if (!points) {
      return { points: [] };
    }
    return { points };
  }

}
