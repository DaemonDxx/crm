import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { CreateTaskDto } from './createTask.dto';
import { TaskPipe } from './taskPipe';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../Utils/permission.guard';
import { Permissions } from '../Utils/permissions.decorator';
import PermissionsList from '../Utils/PermissionsList';

@Controller('task')
export class TaskController {

  constructor(private taskService: TaskService) {
  }

  @Post()
  @Permissions(PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(TaskPipe)
  async createTask(@Body() createTaskDTO: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(createTaskDTO);
  }
}
