import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';
import { CreateTaskDto } from './createTask.dto';
import { Fields } from '../Utils/showModelsOptions';
import { QueueService } from '../queue/queue.service';
import NewTaskEvent from '../events/classes/NewTaskEvent';
import { ITaskInterface } from './task.interface';

@Injectable()
export class TaskService {

  constructor(@InjectModel('Task') private taskModel: Model<Task>) {
  }

  async getTaskById(id: string): Promise<any> {
    const task = await this.taskModel.findById(id)
      .populate('head')
      .populate('members')
      .populate('points')
      .lean();
    return task;
  }

  async createTask(createTaskDTO: CreateTaskDto): Promise<Task> {
    createTaskDTO.number = await this.getNextNumberTask();
    const task = await new this.taskModel(createTaskDTO).save();
    await this.taskModel.populate(task, [
      {path: 'head', select: ['firstName', 'lastName', 'thirdName', '_id']},
      {path: 'members', select: ['firstName', 'lastName', 'thirdName', '_id']},
      {path: 'points'}
    ]);
    return task;
  }


  async updateTask(createTaskDTO: CreateTaskDto): Promise<Task> {
    const updateTask  = await this.taskModel.findByIdAndUpdate(createTaskDTO._id, createTaskDTO)
      .populate('head')
      .populate('members')
      .populate('points');
    return updateTask;
  }

  async getNextNumberTask(): Promise<number> {
    const aggregateOptions = [
      {$sort: {number: -1}},
      {$limit: 1},
      {$project: {_id: 0, number: 1}}
    ];
    const result = await this.taskModel.aggregate(aggregateOptions);
    return (parseInt(result[0].number)+1);
  }


}
