import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';
import { CreateTaskDto } from './createTask.dto';
import { Fields } from '../Utils/showModelsOptions';

@Injectable()
export class TaskService {

  constructor(@InjectModel('Task') private taskModel: Model<Task>) {
  }

  async getTaskById(id: string): Promise<Task> {
    return this.taskModel.findById(id)
      .populate('members', Fields.User)
      .populate('points')
      .populate('head', Fields.User);
  }

  async createTask(createTaskDTO: CreateTaskDto): Promise<Task> {
    const {_id, ...query} = createTaskDTO;
    //ToDO С этим нужно что то сделать, уже дважды
    try{
      let task;
      if (_id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        task = await this.taskModel.findOneAndUpdate({_id: _id}, query, {upsert: true, new: true});
      } else {
        query.number = await this.getNextNumberTask();
        task = await new this.taskModel(query).save();
      }

      return this.getTaskById(task._id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

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
