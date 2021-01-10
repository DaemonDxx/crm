import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { CreateTaskDto } from './createTask.dto';
import { TaskPipe } from './taskPipe';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../Utils/permission.guard';
import { Permissions } from '../Utils/permissions.decorator';
import PermissionsList from '../Utils/PermissionsList';
import EventPayloadDTO from '../events/classes/EventPayloadDTO';
import { ITaskInterface } from './task.interface';
import { TaskTemplate } from '../report/Template/TaskTemplate';
import { XLSXReportDriver } from '../report/Driver/XLSXReportDriver';
import { QueryDatePipe } from '../Utils/queryDatePipe';
import * as path from 'path';
import { STATUS_CODES } from 'http';

@Controller('task')
export class TaskController {

  constructor(private taskService: TaskService) {
  }

  @Post()
  @Permissions(PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(TaskPipe)
  async createTask(@Body() createTaskDTO: CreateTaskDto): Promise<Task> {
    const task = await this.taskService.createTask(createTaskDTO);
    const msg = new EventPayloadDTO('NEW_TASK', {}, task);
    return task;
  }

  @Put()
  @Permissions(PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(TaskPipe)
  async updateTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.updateTask(createTaskDto);
  }

  @Get()
  @Permissions(PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  async getTaskByDate(@Query('date', QueryDatePipe) date: any, @Req() req) {
      const task = await this.taskService.getTaskByDayAndUserID(date, req.user._id);
      return task;
  }

  @Delete()
  @HttpCode(204)
  async deleteTaskByID(@Query('_id') taskID: string): Promise<void> {
    try {
      await this.taskService.deleteTaskByID(taskID);
      return;
    } catch (e) {
      throw new BadRequestException({}, e.message);
    }
  }

}
