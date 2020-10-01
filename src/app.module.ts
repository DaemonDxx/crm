import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InviteModule } from './invite/invite.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PointModule } from './point/point.module';
import { NotificationModule } from './notification/notification.module';
import { TaskModule } from './task/task.module';
import { ResultCheckModule } from './result-check/result-check.module';
import { ReportModule } from './report/report.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ReportModule.forRoot({
      storage: {
        type: 'LOCALHOST',
        storageOptions: {
          pathTemplate: './templates/',
          pathSaveIn: './'
        }
      }
    }),
    InviteModule,
    UserModule,
    //ToDo Брать адрес к бд из модуля настроек
    MongooseModule.forRoot('mongodb://localhost/crm', {
      useFindAndModify: true
    }),
    AuthModule,
    PointModule,
    NotificationModule,
    TaskModule,
    ResultCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ReportModule]
})
export class AppModule {}

