import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './DBModels/notification.model';
import { ReservedNumberSchema } from './DBModels/reservedNumber.model';
import { PointSchema } from '../point/DBModels/point.model';
import { UserSchema } from '../user/user.model';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Notification', schema: NotificationSchema},
    {name: 'ReservedNumber', schema: ReservedNumberSchema},
    {name: 'Point', schema: PointSchema},
    {name: 'User', schema: UserSchema}
  ]),
  ReportModule.forRoot()],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
