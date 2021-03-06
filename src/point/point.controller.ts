import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreatePointDto } from './dto/createPoint.dto';
import { PointService } from './point.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../Utils/permission.guard';
import { CreatePointPipe } from './createPoint.pipe';
import {QueryDatePipe} from '../Utils/queryDatePipe';
import { Point } from './DBModels/point.model';
import { ValidationPipe } from '../Utils/validation.pipe';
import { CreateResultDto } from './dto/createResult.dto';
import { ResultCheckService } from './resultCheck.service';

@UsePipes(new ValidationPipe())
@Controller('points')
export class PointController {

  constructor(private pointService: PointService,
              private readonly resultCheckService: ResultCheckService
              ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(CreatePointPipe)
  async createPoint(@Body() createPointDTO: CreatePointDto): Promise<any> {
    try {
      const point = await this.pointService.createPoint(createPointDTO);
      return point;
    } catch ({ message }) {
      throw new ForbiddenException(message);
    }
  }

  @Get('/day')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  async getAllPointForDay(@Query('date', new QueryDatePipe("day")) queryParam: any): Promise<any> {
      const points = await this.pointService.findPointsByDate(queryParam);
      return points;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  async getPointsByContract(
    @Query('contract') contract: string,
    @Query("date", new QueryDatePipe("month")) queryDate: string): Promise<Point[]> {
      const points = await this.pointService.findPointByContract(contract, queryDate);
      return points;
  }

  @Post('/results')
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
