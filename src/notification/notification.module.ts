import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './notification.model';
import { ReservedNumberSchema } from './reservedNumber.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Notification', schema: NotificationSchema},
    {name: 'ReservedNumber', schema: ReservedNumberSchema}
  ])],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
