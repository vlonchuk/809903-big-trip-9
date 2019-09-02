import * as utils from './../utils';

export default class Filter {
  constructor(filters) {
    this._filters = filters;
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
    return `<form class="trip-filters" action="#" method="get">
    ${this._filters.map((f) => `
      <div class="trip-filters__filter">
        <input id="filter-${f.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-${f.name}" value="${f.name}" ${f.checked ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${f.name}">${f.caption}</label>
      </div>
    `).join(``)}
    
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
    `;
  }
}
