import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';
import { CreateTaskDto } from './createTask.dto';
import { ParseDate } from '../Utils/PipeFucntions/parseDate.functions';
import * as moment from 'moment';

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
    createTaskDTO.members.forEach((item) => {
      this.deleteMemberInOldTask(this.getQueryDate(createTaskDTO.date), item);
    }, this);
    const task = await new this.taskModel(createTaskDTO).save();
    await this.taskModel.populate(task, [
      {path: 'head', select: ['firstName', 'lastName', 'thirdName', '_id']},
      {path: 'members', select: ['firstName', 'lastName', 'thirdName', '_id']},
      {path: 'points'}
    ]);
    return task;
  }

  async updateTask(createTaskDTO: CreateTaskDto): Promise<Task> {
    const updateTask  = await this.taskModel.findByIdAndUpdate(createTaskDTO._id, createTaskDTO);
    const task = await this.taskModel.findById(updateTask._id)
      .populate([
        {path: 'head', select: ['firstName', 'lastName', 'thirdName', '_id']},
        {path: 'members', select: ['firstName', 'lastName', 'thirdName', '_id']},
        {path: 'points'}]);
    return task;
  }

  async getNextNumberTask(): Promise<number> {
    const aggregateOptions = [
      {$sort: {number: -1}},
      {$limit: 1},
      {$project: {_id: 0, number: 1}}
    ];
    try {
       const result = await this.taskModel.aggregate(aggregateOptions);
       return (parseInt(result[0].number)+1);
    } catch (e) {
      return 1;
    }
  }

  async deleteMemberInOldTask(date: any, member: any) {
    const task = await this.getTaskByDayAndUserID(date,member);
    if (task) {
      const newMembers = task.members.filter((item) => {
        // @ts-ignore
        if (item._id.toString() === member._id) return false
        return true
      });
      task.members = newMembers;
      await task.save();
    }
  }

  getQueryDate(date: any) {
    const startDay = moment(new Date(date)).startOf('day');
    return {$gte: startDay.format(), $lte: startDay.endOf('day').format()};
  }

  async getTaskByDayAndUserID(date: any, userID: string): Promise<Task> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const task = await this.taskModel.findOne({members: {$in: [userID]}, date}).populate([
      {path: 'head', select: ['firstName', 'lastName', 'thirdName', '_id']},
      {path: 'members', select: ['firstName', 'lastName', 'thirdName', '_id']},
      {path: 'points'}
    ]);
    return task;
  }

  async deleteTaskByID(taskID: string): Promise<boolean> {
    const response = await this.taskModel.findByIdAndDelete(taskID);
    console.log(response);
    return true;
  }


}
