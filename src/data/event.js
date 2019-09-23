import EVENT_TYPE from './../data/event-type';
import CITY_NAME from './../data/city-name';
import {generateDescription} from './../data/description';
import {generateOptions} from './../data/option';
import {generatePhoto} from './../data/photo';
import EventData from './../data/event-data';

const MAX_EVENT_OPTION = 2;

export const generateEventData = (StartTime = Date.now()) => {
  const obj = {
    type: EVENT_TYPE[Math.floor(Math.random() * EVENT_TYPE.length)],
    city: CITY_NAME[Math.floor(Math.random() * CITY_NAME.length)],
    get title() {
      return `${this.type.name} ${this.type.isMoving ? `to` : `in`} ${this.city}`;
    },

    startTime: StartTime,
    endTime: StartTime + Math.random() * 30 * 3600 * 1000,

    price: 10 + Math.floor(Math.random() * 100),
    description: generateDescription(),
    options: generateOptions(MAX_EVENT_OPTION),
    photo: generatePhoto()
  };

  return new EventData(obj);
};
