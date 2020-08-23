import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResultCheck } from './result-check.model';
import { CreateResultDto } from './createResult.dto';

@Injectable()
export class ResultCheckService {

  constructor(@InjectModel('ResultCheck') private resultCheckModel: Model<ResultCheck>) {
  }

  async createResult(createResultDTO: CreateResultDto): Promise<ResultCheck> {
    const {_id, ...query} = createResultDTO;
    let result;
    try {
      if (_id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result = await this.resultCheckModel.findOneAndUpdate({point: createResultDTO.point}, query, {upsert: true, new: true});
      } else {
        result = await new this.resultCheckModel(createResultDTO).save();
      }
      return result;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }


}
