import {generateTripInfo} from './components/trip-info';
import {generateMenu} from './components/menu';
import {generateFilter} from './components/filter';
import {generateSort} from './components/sort';
import {generateEvent} from './components/event';
import {generateEditEvent} from './components/edit-event';

const tripMain = document.querySelector(`.trip-main`);
const tripInfo = tripMain.querySelector(`.trip-main__trip-info `);
const mainBlock = tripMain.querySelector(`.trip-main__trip-controls`);
const mainBlockFirstChild = mainBlock.firstElementChild;
const tripEvents = document.querySelector(`.trip-events`);

tripInfo.insertAdjacentHTML(`afterbegin`, generateTripInfo());
mainBlockFirstChild.insertAdjacentHTML(`afterend`, generateMenu());
mainBlock.insertAdjacentHTML(`beforeend`, generateFilter());

tripEvents.insertAdjacentHTML(`beforeend`, generateSort());

tripEvents.insertAdjacentHTML(`beforeend`, generateEditEvent());

tripEvents.insertAdjacentHTML(`beforeend`, generateEvent());
tripEvents.insertAdjacentHTML(`beforeend`, generateEvent());
tripEvents.insertAdjacentHTML(`beforeend`, generateEvent());
