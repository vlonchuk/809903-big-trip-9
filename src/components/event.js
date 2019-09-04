import AbstractComponent from './../components/abstract-component';

export default class Event extends AbstractComponent {
  constructor({type, title, startTime, endTime, duration, price, options}) {
    super();
    this._type = type;
    this._title = title;
    this._startTime = startTime;
    this._endTime = endTime;
    this._duration = duration;
    this._price = price;
    this._options = options;
  }

  getTemplate() {
    return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type.name}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${this._title}</h3>
    
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${(new Date(this._startTime)).toISOString()}">${(new Date(this._startTime)).toLocaleTimeString().slice(0, 5)}</time>
          &mdash;
          <time class="event__end-time" datetime="${(new Date(this._endTime)).toISOString()}">>${(new Date(this._endTime)).toLocaleTimeString().slice(0, 5)}</time>
        </p>
        <p class="event__duration">${this._duration}</p>
      </div>
    
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${this._price}</span>
      </p>
    
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${this._options.map((o) => `
        <li class="event__offer">
          <span class="event__offer-title">${o.description}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${o.price}</span>
         </li>
        `).join(``)}
      </ul>
    
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    </li>
    `;
  }
}
