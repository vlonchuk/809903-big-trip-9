import {generateTripInfo} from './components/trip-info';
import {generateMenu} from './components/menu';
import {generateFilter} from './components/filter';
import {generateSort} from './components/sort';
import {generateEvent} from './components/event';
import {generateEditEvent} from './components/edit-event';

import {generateTripRoute} from './data/trip-route';
import menuData from './data/menu';
import filterData from './data/filter';
import columnData from './data/columns';

const tripMain = document.querySelector(`.trip-main`);
const tripInfo = tripMain.querySelector(`.trip-main__trip-info `);
const mainBlock = tripMain.querySelector(`.trip-main__trip-controls`);
const mainBlockFirstChild = mainBlock.firstElementChild;
const tripEvents = document.querySelector(`.trip-events`);

const tripRoute = generateTripRoute();

tripInfo.insertAdjacentHTML(`afterbegin`, generateTripInfo(tripRoute));
mainBlockFirstChild.insertAdjacentHTML(`afterend`, generateMenu(menuData));
mainBlock.insertAdjacentHTML(`beforeend`, generateFilter(filterData));

tripEvents.insertAdjacentHTML(`beforeend`, generateSort(columnData));

tripEvents.insertAdjacentHTML(`beforeend`, generateEditEvent(tripRoute[0]));

tripRoute.forEach((event, index) => {
  if (index > 0) {
    tripEvents.insertAdjacentHTML(`beforeend`, generateEvent(event));
  }
});

