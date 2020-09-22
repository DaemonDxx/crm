import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [{
       name: 'work',
       type: 'topic'
         }],
      uri: 'amqp://rabbitmq:rabbitmq@localhost:5672'
  })],
  providers: [QueueService],
  controllers: [QueueController],
  exports: [QueueService]
})
export class QueueModule {}
