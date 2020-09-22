
interface IEvent {

  //Для rabbitmq
  exchange: string;
  routingKey: string;

  description: string
  _payload: any;

  toString(): string;

}

export default IEvent