import { Global, Module } from '@nestjs/common';
import {BullModule} from '@nestjs/bull';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: "report",
      redis: {
        host: 'localhost',
        port: 6379
      }
    })
  ],
  exports: [
    BullModule
  ]
  },

)
export class QueueModule {}
