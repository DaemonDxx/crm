import { Module } from '@nestjs/common';
import { ResultCheckController } from './result-check.controller';
import { ResultCheckService } from './result-check.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultCheckSchema } from './result-check.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'ResultCheck', schema: ResultCheckSchema}
  ])],
  controllers: [ResultCheckController],
  providers: [ResultCheckService]
})
export class ResultCheckModule {}
