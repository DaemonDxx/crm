import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
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

  @Get('/test')
  async getHello(@Req() req): Promise<string> {
    const driver = new XLSXReportDriver();
    const n: ITaskInterface = await this.taskService.getTaskById('5f6b5773f681c91dec1ce69a');
    await driver.setTemplate(new TaskTemplate(n));
    const link = await driver.generateReport();
    return link;
  }
}
