import IEvent from './IEvent';
import EventPayloadDTO from './EventPayloadDTO';

class BasicEvent implements IEvent {

  payload: EventPayloadDTO;
  exchange: string;
  routingKey: string;
  description: string;

  constructor(payload: EventPayloadDTO) {
    this.payload = payload;
  }

  toString(): string {
    return `Базовое событие`;
  }

}

export default BasicEvent