import { BadRequestException, Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreatePointDto } from './createPoint.dto';
import { PointService } from './point.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../Utils/permission.guard';
import PermissionsList from '../Utils/PermissionsList';
import { Permissions } from '../Utils/permissions.decorator';
import { CreatePointPipe } from './createPoint.pipe';


@Controller('point')
export class PointController {

  constructor(private pointService: PointService) {
  }

  @Post()
  @Permissions(PermissionsList.point, PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(CreatePointPipe)
  async createPoint(@Body() createPointDTO: CreatePointDto): Promise<any> {
    const point = await this.pointService.createPoint(createPointDTO);
    if (!point) {
      throw new BadRequestException(`Точка не сохранена ${createPointDTO.numberDevice}`);
    }
    return {}
  }

}
