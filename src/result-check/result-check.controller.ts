import { Body, Controller, Post } from '@nestjs/common';
import { ResultCheck } from './result-check.model';
import { CreateResultDto } from './createResult.dto';
import { ResultCheckService } from './result-check.service';

@Controller('result')
export class ResultCheckController {

  constructor(private resultService: ResultCheckService) {
  }

  @Post()
  createResult(@Body() createResultDTO: CreateResultDto): Promise<ResultCheck> {
    return this.resultService.createResult(createResultDTO);
  }

}
