export const generateMenu = (data) => `
<nav class="trip-controls__trip-tabs  trip-tabs">
${data.map((m) => `<a class="trip-tabs__btn ${m.active ? ` trip-tabs__btn--active` : ``}" href="#">${m.caption}</a>`).join(``)}
</nav>
`;
