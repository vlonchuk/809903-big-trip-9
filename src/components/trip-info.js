import AbstractComponent from './../components/abstract-component';

export default class TripInfo extends AbstractComponent {
  constructor(route) {
    super();
    this._route = route;
    this.calc();
  }

  calc() {
    if (this._route.length > 0) {
      const start = this._route[0];
      const end = this._route[this._route.length - 1];

      if (this._route.length > 3) {
        this._title = `${start.city} - ... - ${end.city}`;
      } else {
        this._title = this._route.map((e) => e.city).join(` - `);
      }

      if (start.startMonth === end.endMonth) {
        this._dates = `${start.startMonth} ${start.startDay} - ${end.endDay}`;
      } else {
        this._dates = `${start.startDay} ${start.startMonth} - ${end.endDay} ${end.endMonth}`;
      }
    } else {
      this._title = null;
      this._dates = null;
    }
  }

  getTemplate() {
    return `<div><div class="trip-info__main">
      <h1 class="trip-info__title">${this._title ? this._title : ``}</h1>
      <p class="trip-info__dates">${this._dates ? this._dates : ``}</p>
    </div>`;
  }
}
