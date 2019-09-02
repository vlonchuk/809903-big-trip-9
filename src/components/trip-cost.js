import * as utils from './../utils';

export default class TripCost {
  constructor(route) {
    this._route = route;
    this.calc();
  }

  calc() {
    this._total = 0;
    this._route.forEach((event) => {
      this._total += event.price;
      event.options.forEach((o) => {
        this._total += o.price;
      });
    });
  }

  getElement() {
    if (!this._element) {
      this._element = utils.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    utils.unrender(this._element);
    this._element = null;
  }

  getTemplate() {
    return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._total}</span>
    </p></div>
    `;
  }
}
