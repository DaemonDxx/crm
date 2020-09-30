import { DynamicModule, Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ServiceOptions } from './service.options';

@Module({
  providers: [ReportService],
  exports: [ReportService]
})
export class ReportModule {

  static forRoot(options: ServiceOptions): DynamicModule {
    return {
      module: ReportModule,
      providers: [{
        provide: ReportService,
        useFactory: () => {
          return new ReportService(options);
        }
      }],
      exports: [ReportService]
    }
  }

}
