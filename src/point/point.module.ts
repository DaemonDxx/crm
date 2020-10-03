import { Module } from '@nestjs/common';
import { PointController } from './point.controller';
import { PointService } from './point.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PointSchema } from './DBModels/point.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ResultCheckSchema } from './DBModels/result-check.model';
import { ResultCheckService } from './resultCheck.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Point', schema: PointSchema},
      {name: 'ResultCheck', schema: ResultCheckSchema}
  ]),

  ],
  controllers: [PointController],
  providers: [PointService, ResultCheckService]
})
export class PointModule {}
