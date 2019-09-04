import AbstractComponent from './../components/abstract-component';

export default class Menu extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${this._data.map((m) => `<a class="trip-tabs__btn ${m.active ? ` trip-tabs__btn--active` : ``}" href="#">${m.caption}</a>`).join(``)}
    </nav>
    `;
  }
}

