import AbstractComponent from './../components/abstract-component';

export default class TripCost extends AbstractComponent {
  constructor(route) {
    super();
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

  getTemplate() {
    return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._total}</span>
    </p></div>
    `;
  }
}
