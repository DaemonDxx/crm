import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import IEvent from '../events/classes/IEvent';

@Injectable()
export class QueueService {

  constructor(private readonly amqpConn: AmqpConnection) {
  }

  async emit(event: IEvent): Promise<boolean> {
    try {
      this.amqpConn.publish(event.exchange, event.routingKey, event.payload);
      return true
    } catch (e) {
      console.log(e.message);
      return false
    }
  }

}
