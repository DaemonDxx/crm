import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InviteModule } from './invite/invite.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PointModule } from './point/point.module';
import { NotificationModule } from './notification/notification.module';
import { TaskModule } from './task/task.module';
import { ResultCheckModule } from './result-check/result-check.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    InviteModule,
    UserModule,
    //ToDo Брать адрес к бд из модуля настроек
    MongooseModule.forRoot('mongodb://localhost/crm', {
      useFindAndModify: true
    }),
    AuthModule,
    // ClientsModule.register([
    //   {
    //     name: 'TEST_Service',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
    //       queue: process.env.QUEUE || 'test',
    //       queueOptions: {
    //         durable: false
    //       }
    //     }
    //   },
    // ]),
    PointModule,
    NotificationModule,
    TaskModule,
    ResultCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
