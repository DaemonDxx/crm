import IEvent from './IEvent';

class BasicEvent implements IEvent {

  _payload: any;
  exchange: string;
  routingKey: string;
  description: string;

  constructor(payload: any) {
    this._payload = payload;
    this._payload.dateAt = new Date();
  }

  toString(): string {
    return `Базовое событие`;
  }

}

export default BasicEvent