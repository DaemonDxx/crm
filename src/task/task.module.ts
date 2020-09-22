import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './task.model';
import { QueueService } from '../queue/queue.service';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Task', schema: TaskSchema}
  ]),
    QueueModule
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
