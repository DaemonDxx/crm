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
import { CreateResultDto } from './dto/createResult.dto';
import { ResultCheckService } from './resultCheck.service';

@Controller('point')
export class PointController {

  constructor(private pointService: PointService,
              private readonly resultCheckService: ResultCheckService
              ) {}

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
  async getPointsByContract(@Query('contract') contract: string): Promise<Point[]> {
    const points = await this.pointService.findPointByContract(String(contract));
    return points || [];
  }

  @Post('/result')
  async createResultCheck(@Body() createResultDTO: CreateResultDto): Promise<Point> {
    let point = await this.pointService.findPointByID(createResultDTO.pointID);
    if (point) {
      const resultCheck = await this.resultCheckService.createResultCheck(createResultDTO);
      point.resultCheck = resultCheck._id;
      point = await this.pointService.updatePoint(point);
      return point;
    } else {
      throw new BadRequestException({}, 'Данной точки не существует');
    }
  }

}
