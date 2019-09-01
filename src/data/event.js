import EVENT_TYPE from './../data/event-type';
import CITY_NAME from './../data/city-name';
import {generateDescription} from './../data/description';
import {generateOptions} from './../data/option';
import {generatePhoto} from './../data/photo';

const MAX_EVENT_OPTION = 2;
const DATE_OPT = {day: `2-digit`, month: `2-digit`, year: `2-digit`};
const TIME_OPT = {hour: `2-digit`, minute: `2-digit`};

const getDay = (date) => (new Date(date)).toLocaleDateString(`en`, {day: `2-digit`});
const getMonth = (date) => (new Date(date)).toLocaleDateString(`en`, {month: `short`}).toUpperCase();
const getDateStr = (value) => {
  const date = new Date(value);
  return `${date.toLocaleDateString(`en-GB`, DATE_OPT)} ${date.toLocaleTimeString(`en-GB`, TIME_OPT)}`;
};

export const generateEventData = (StartTime = Date.now()) => ({
  type: EVENT_TYPE[Math.floor(Math.random() * EVENT_TYPE.length)],
  city: CITY_NAME[Math.floor(Math.random() * CITY_NAME.length)],
  get title() {
    return `${this.type.name} ${this.type.isMoving ? `to` : `in`} ${this.city}`;
  },

  startTime: StartTime,
  endTime: StartTime + Math.random() * 100 * 3600 * 1000,
  get duration() {
    const diff = this.endTime - this.startTime;
    const days = Math.floor(diff / (24 * 3600 * 1000));
    const diffWithinDay = diff - days * 24 * 3600 * 1000;
    const hours = Math.floor(diffWithinDay / (3600 * 1000));
    const mins = Math.floor((diffWithinDay - hours * 3600 * 1000) / 60000);

    const sDays = `${(`00` + days).slice(-2)}D`;
    const sHours = `${(`00` + hours).slice(-2)}H`;
    const sMins = `${(`00` + mins).slice(-2)}M`;

    return `${days > 0 ? sDays : ``} ${hours > 0 ? sHours : ``} ${sMins}`;
  },
  get startMonth() {
    return getMonth(this.startTime);
  },
  get startDay() {
    return getDay(this.startTime);
  },
  get endMonth() {
    return getMonth(this.endTime);
  },
  get endDay() {
    return getDay(this.endTime);
  },
  get startDate() {
    return getDateStr(this.startTime);
  },
  get endDate() {
    return getDateStr(this.endTime);
  },

  price: 10 + Math.floor(Math.random() * 100),
  description: generateDescription(),
  options: generateOptions(MAX_EVENT_OPTION),
  photo: generatePhoto()
});
