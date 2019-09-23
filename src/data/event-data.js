const DATE_OPT = {day: `2-digit`, month: `2-digit`, year: `2-digit`};
const TIME_OPT = {hour: `2-digit`, minute: `2-digit`};

const getDay = (date) => (new Date(date)).toLocaleDateString(`en`, {day: `2-digit`});
const getMonth = (date) => (new Date(date)).toLocaleDateString(`en`, {month: `short`}).toUpperCase();
const getDateStr = (value) => {
  const date = new Date(value);
  return `${date.toLocaleDateString(`en-GB`, DATE_OPT)} ${date.toLocaleTimeString(`en-GB`, TIME_OPT)}`;
};

export default class EventData {
  constructor({type, city, startTime, endTime, price, description, options, photo}) {
    this._type = type;
    this._city = city;
    this._startTime = startTime;
    this._endTime = endTime;
    this._price = price;
    this._description = description;
    this._options = options;
    this._photo = photo;
  }

  get type() {
    return this._type;
  }

  get city() {
    return this._city;
  }

  get title() {
    return `${this.type.name} ${this.type.isMoving ? `to` : `in`} ${this.city}`;
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }

  get price() {
    return this._price;
  }

  get description() {
    return this._description;
  }

  get options() {
    return this._options;
  }

  get photo() {
    return this._photo;
  }

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
  }

  get startMonth() {
    return getMonth(this.startTime);
  }

  get startDay() {
    return getDay(this.startTime);
  }

  get endMonth() {
    return getMonth(this.endTime);
  }

  get endDay() {
    return getDay(this.endTime);
  }

  get startDate() {
    return getDateStr(this.startTime);
  }

  get endDate() {
    return getDateStr(this.endTime);
  }
}
