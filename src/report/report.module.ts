import { DynamicModule, Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ServiceOptions } from './service.options';
import { FileController } from './report.contoller';

@Module({})
export class ReportModule {

  static forRoot(options?: ServiceOptions): DynamicModule {
    return {
      module: ReportModule,
      controllers: [FileController],
      providers: [{
        provide: ReportService,
        useFactory: () => {
          console.log('CREATE!')
          return new ReportService(options);
        }
      }],
      exports: [ReportService]
    }
  }

}
