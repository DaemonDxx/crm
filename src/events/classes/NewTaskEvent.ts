import BasicEvent from './BasicEvent';
import RoutingKeyMap from '../RoutingKeyMap';

class NewTaskEvent extends BasicEvent {

  description: string;
  routingKey: string;
  exchange: string;
  _payload: any;


  constructor(payload: any) {
    super(payload);
    this.description = 'Создано новое задание';
    this.exchange = 'work';
    this.routingKey = RoutingKeyMap.NEW_TASK_EVENT;
  }

}

export default NewTaskEvent