import AbstractComponent from './abstract-component';

export default class TripDay extends AbstractComponent {
  constructor(tripDay) {
    super();
    this._day = tripDay;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._day.day}</span>
        ${this._day.day !== `` ? `<time class="day__date" datetime="2019-03-18">${this._day.events[0].startMonth} ${this._day.events[0].startDay}</time>` : ``}        
      </div>
    </li>
    `;
  }
}
