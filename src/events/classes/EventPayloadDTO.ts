

class EventPayloadDTO {

  typeEvent: string;
  params: any;
  data: any;
  dateAt: Date;

  constructor(type: string, params: any, data: any) {
    this.typeEvent = type;
    this.params = params;
    this.data = data;
    this.dateAt = new Date();
  }

}

export default EventPayloadDTO