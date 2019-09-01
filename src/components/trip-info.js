export const generateTripInfo = (route) => {
  const start = route[0];
  const end = route[route.length - 1];
  let title;
  if (route.length > 3) {
    title = `${start.city} - ... - ${end.city}`;
  } else {
    title = route.map((e) => e.city).join(` - `);
  }
  let dates;
  if (start.startMonth === end.endMonth) {
    dates = `${start.startMonth} ${start.startDay} - ${end.endDay}`;
  } else {
    dates = `${start.startDay} ${start.startMonth} - ${end.endDay} ${end.endMonth}`;
  }

  let total = 0;
  route.forEach((event) => {
    total += event.price;
    event.options.forEach((o) => {
      total += o.price;
    });
  });

  return `
<div class="trip-info__main">
  <h1 class="trip-info__title">${title}</h1>
  <p class="trip-info__dates">${dates}</p>
</div>

<p class="trip-info__cost">
Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
</p>
`;
};
