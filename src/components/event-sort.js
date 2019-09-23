import AbstractComponent from './abstract-component';
import {COLUMN_SORT_TYPE} from './../data/columns';

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

  getTemplate() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${this._columns.map((column) => {
    return !column.sortable ?
      `<span class="trip-sort__item trip-sort__item--${column.name}">${column.showedByEvent && this._activeCol !== COLUMN_SORT_TYPE.EVENT ? `` : column.name}</span>` :
      `<div class="trip-sort__item  trip-sort__item--${column.name}">
             <input id="sort-${column.name}" class="trip-sort__input  visually-hidden" type="radio" 
                name="trip-sort" value="sort-${column.name}"
               ${column.name === this._activeCol ? `checked` : ``}>
             <label class="trip-sort__btn" for="sort-${column.name}" data-sort-type="${column.name}">
             ${column.name}
             ${column.active ? SVG : ``}
             </label>
           </div>
          `;
  }).join(``)}
    </form>
    `;
  }
}

