import { Module } from '@nestjs/common';
import { PointController } from './point.controller';
import { PointService } from './point.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PointSchema } from './point.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
    {name: 'Point', schema: PointSchema}
  ]),
    // ClientsModule.register([
    //   {
    //     name: 'FILE_PARSER_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       noAck: false,
    //       urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
    //       queue: 'files',
    //       queueOptions: {
    //         durable: true
    //       }
    //     }
    //   },
    // ]),

  ],
  controllers: [PointController],
  providers: [PointService]
})
export class PointModule {}
