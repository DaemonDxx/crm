
import EventPayloadDTO from './EventPayloadDTO';

interface IEvent {

  //Для rabbitmq
  exchange: string;
  routingKey: string;

  description: string
  payload: EventPayloadDTO;

  toString(): string;

}

export default IEvent