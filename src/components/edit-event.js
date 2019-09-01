import EVENT_TYPE from './../data/event-type';
import CITY_NAME from './../data/city-name';
import {availableOptions} from './../data/option';

const generateEventTypeChoice = (t) => `
<div class="event__type-item">
  <input id="event-type-${t.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t.name}">
  <label class="event__type-label  event__type-label--${t.name}" for="event-type-${t.name}-1">${t.name}</label>
</div>          
`;

export const generateEditEvent = (event) => `
<li class="trip-events__item">
<form class="event  event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
          ${EVENT_TYPE.filter((t) => t.isMoving).map(generateEventTypeChoice).join(``)}
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
          ${EVENT_TYPE.filter((t) => !t.isMoving).map(generateEventTypeChoice).join(``)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${event.type.name} ${event.type.isMoving ? `to` : `at`}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.city}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${CITY_NAME.map((c) => `<option value="${c}"></option>`)}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${event.startDate}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${event.endDate}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>

    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>

  <section class="event__details">

    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">

        ${availableOptions
          .map((o) => ({opt: o, checked: event.options.indexOf(o) >= 0}))
          .map((o) => `
            <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${o.opt.name}-1" type="checkbox" name="event-offer-${o.opt.name}" ${o.checked ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-${o.opt.name}-1">
              <span class="event__offer-title">${o.opt.description}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">30</span>
            </label>
            </div>
          `).join(``)}

      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${event.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${event.photo.map((p) => `<img class="event__photo" src="${p}" alt="Event photo">`)}
        </div>
      </div>
    </section>
  </section>
</form>
</li>
`;
