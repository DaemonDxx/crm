import { DynamicModule, Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ServiceOptions } from './interfaces/service.options';
import { FileController } from './report.contoller';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import {FileReportSchema} from './DBModels/fileReport.model';
import { DbService } from './db.service';
import { ConsumerService } from './consumer.servise';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'fileReport', schema: FileReportSchema}]),
  ],
  providers: [
    DbService
  ],
  exports: [DbService]
})
class DBModule {}


@Module({
  providers: [
    ConsumerService,
    ReportService
  ]
})
export class ReportModule {

  static forRoot(options?: ServiceOptions): DynamicModule {
    return {
      module: ReportModule,
      imports: [DBModule],
      controllers: [FileController],
      providers: [{
        provide: ReportService,
        useFactory: (db: DbService) => {
          return new ReportService(options, db);
        },
        inject: [DbService]
      }],
      exports: [ReportService]
    }
  }

}

