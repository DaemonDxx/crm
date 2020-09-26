import BasicEvent from './BasicEvent';
import RoutingKeyMap from '../RoutingKeyMap';
import EventPayloadDTO from './EventPayloadDTO';

class NewTaskEvent extends BasicEvent {

  description: string;
  routingKey: string;
  exchange: string;
  payload: EventPayloadDTO;


  constructor(payload: EventPayloadDTO) {
    super(payload);
    this.description = 'Создано новое задание';
    this.exchange = 'work';
    this.routingKey = RoutingKeyMap.NEW_TASK_EVENT;
  }

}

export default NewTaskEvent