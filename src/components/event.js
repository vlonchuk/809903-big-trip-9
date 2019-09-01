export const generateEvent = ({type, title, startTime, endTime, duration, price, options}) => `
<li class="trip-events__item">
<div class="event">
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type.name}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${title}</h3>

  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${(new Date(startTime)).toISOString()}">${(new Date(startTime)).toLocaleTimeString().slice(0, 5)}</time>
      &mdash;
      <time class="event__end-time" datetime="${(new Date(endTime)).toISOString()}">>${(new Date(endTime)).toLocaleTimeString().slice(0, 5)}</time>
    </p>
    <p class="event__duration">${duration}</p>
  </div>

  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${price}</span>
  </p>

  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${options.map((o) => `
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
