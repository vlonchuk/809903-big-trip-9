const SVG = `
<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
</svg>
`;

export const generateSort = (columns) => `
<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${columns.map((c) => {
    return !c.sortable ?
      `<span class="trip-sort__item  trip-sort__item--${c.name}">${c.name}</span>` :
      `<div class="trip-sort__item  trip-sort__item--${c.name}">
         <input id="sort-${c.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${c.name}"
           ${c.active ? `checked` : ``}>
         <label class="trip-sort__btn" for="sort-${c.name}">
         ${c.name}
         ${c.active ? SVG : ``}
         </label>
       </div>
      `;
  }).join(``)}
</form>
`;
