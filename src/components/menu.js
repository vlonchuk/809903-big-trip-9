import * as utils from './../utils';

export default class Menu {
  constructor(data) {
    this._data = data;
  }


  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${this._data.map((m) => `<a class="trip-tabs__btn ${m.active ? ` trip-tabs__btn--active` : ``}" href="#">${m.caption}</a>`).join(``)}
    </nav>
    `;
  }
}

