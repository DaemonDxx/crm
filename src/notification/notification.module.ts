import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './notification.model';
import { ReservedNumberSchema } from './reservedNumber.model';
import { PointSchema } from '../point/point.model';
import { UserSchema } from '../user/user.model';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Notification', schema: NotificationSchema},
    {name: 'ReservedNumber', schema: ReservedNumberSchema},
    {name: 'Point', schema: PointSchema},
    {name: 'User', schema: UserSchema}
  ]),
    ReportModule.forRoot({
      storage: {
        type: 'LOCALHOST',
        storageOptions: {
          pathTemplate: './templates/',
          pathSaveIn: './'
        }
      }
    })],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
