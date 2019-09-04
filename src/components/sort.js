import AbstractComponent from './../components/abstract-component';

const SVG = `
<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
</svg>
`;

export default class Sort extends AbstractComponent {
  constructor(columns, activeCol) {
    super();
    this._columns = columns;
    this._activeCol = activeCol;
  }

  get activeCol() {
    return this._activeCol;
  }

  set activeCol(value) {
    this._activeCol = value;
  }

  getTemplate() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${this._columns.map((c) => {
    return !c.sortable ?
      `<span class="trip-sort__item trip-sort__item--${c.name}">${c.name}</span>` :
      `<div class="trip-sort__item  trip-sort__item--${c.name}">
             <input id="sort-${c.name}" class="trip-sort__input  visually-hidden" type="radio" 
                name="trip-sort" data-sort-type="${c.name}" value="sort-${c.name}"
               ${c.name === this._activeCol ? `checked` : ``}>
             <label class="trip-sort__btn" for="sort-${c.name}">
             ${c.name}
             ${c.active ? SVG : ``}
             </label>
           </div>
          `;
  }).join(``)}
    </form>
    `;
  }
}

