import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResultCheck } from './DBModels/result-check.model';
import { CreateResultDto } from './dto/createResult.dto';

@Injectable()
export class ResultCheckService {

  constructor(@InjectModel('ResultCheck') private readonly resultCheckModel: Model<ResultCheck>) {
  }

  async createResultCheck(createResultDTO: CreateResultDto): Promise<ResultCheck> {
    const resultCheck = await new this.resultCheckModel(
      {result: createResultDTO.result, description: createResultDTO.description})
      .save();
    return resultCheck;
  }

}