import { Body, Controller, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { CreateTaskDto } from './createTask.dto';
import { TaskPipe } from './taskPipe';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '../Utils/permission.guard';
import { Permissions } from '../Utils/permissions.decorator';
import PermissionsList from '../Utils/PermissionsList';
import { QueueService } from '../queue/queue.service';
import NewTaskEvent from '../events/classes/NewTaskEvent';

@Controller('task')
export class TaskController {

  constructor(private taskService: TaskService,
              private readonly queueService: QueueService) {
  }

  @Post()
  @Permissions(PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(TaskPipe)
  async createTask(@Body() createTaskDTO: CreateTaskDto): Promise<Task> {
    const task = await this.taskService.createTask(createTaskDTO);
    await this.queueService.emit(new NewTaskEvent(task.toObject()));
    return task;
  }

  @Put()
  @Permissions(PermissionsList.creator)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(TaskPipe)
  async updateTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.updateTask(createTaskDto);
  }
}
