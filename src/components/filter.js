export const generateFilter = (data) => `
<form class="trip-filters" action="#" method="get">
${data.map((f) => `
  <div class="trip-filters__filter">
    <input id="filter-${f.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-${f.name}" value="${f.name}" ${f.checked ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${f.name}">${f.caption}</label>
  </div>
`).join(``)}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>
`;
