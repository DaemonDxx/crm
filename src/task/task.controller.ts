import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { CreateTaskDto } from './createTask.dto';
import { TaskPipe } from './taskPipe';

@Controller('task')
export class TaskController {

  constructor(private taskService: TaskService) {
  }

  @Post()
  @UsePipes(TaskPipe)
  async createTask(@Body() createTaskDTO: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(createTaskDTO);
  }
}
