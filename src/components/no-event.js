import * as utils from './../utils';

export default class NoEvent {
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
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}
