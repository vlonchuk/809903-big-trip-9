import * as utils from './utils';
import Menu from './components/menu';
import TripInfo from './components/trip-info';
import TripCost from './components/trip-cost';
import Filter from './components/filter';
import Sort from './components/sort';
import EditEvent from './components/edit-event';
import Event from './components/event';
import NoEvent from './components/no-event';

import {generateTripRoute} from './data/trip-route';
import menuData from './data/menu';
import filterData from './data/filter';
import columns from './data/columns';

const tripMain = document.querySelector(`.trip-main`);
const tripInfoContainer = tripMain.querySelector(`.trip-main__trip-info `);
const mainBlock = tripMain.querySelector(`.trip-main__trip-controls`);
const menuContainer = mainBlock;
const tripEvents = document.querySelector(`.trip-events`);

const tripRoute = generateTripRoute();
const tripInfo = new TripInfo(tripRoute);
const tripCost = new TripCost(tripRoute);
const menu = new Menu(menuData);
const filter = new Filter(filterData);
const sort = new Sort(columns);
const noEvent = new NoEvent();

utils.render(tripInfoContainer, tripInfo.getElement(), utils.Position.BEFOREEND);
utils.render(tripInfoContainer, tripCost.getElement(), utils.Position.BEFOREEND);
utils.render(menuContainer, menu.getElement(), utils.Position.BEFOREEND);
utils.render(menuContainer, filter.getElement(), utils.Position.BEFOREEND);
if (tripRoute.length > 0) {
  utils.render(tripEvents, sort.getElement(), utils.Position.BEFOREEND);
} else {
  utils.render(tripEvents, noEvent.getElement(), utils.Position.BEFOREEND);
}

for (let event of tripRoute) {
  let eventComponent = new Event(event);
  let editEventComponent = new EditEvent(event);

  let btn = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  let closeEditEventHandler = function () {
    editEventComponent.getElement().parentElement.replaceChild(eventComponent.getElement(), editEventComponent.getElement());
    document.removeEventListener(`keydown`, keydownEventHandler);
  };
  let keydownEventHandler = function (evt) {
    if (evt.keyCode === utils.Keys.ESCAPE) {
      closeEditEventHandler();
    }
  };
  let openEditEventHandler = function () {
    const e = new KeyboardEvent(`keydown`, {
      bubbles: true,
      keyCode: utils.Keys.ESCAPE
    });
    document.dispatchEvent(e);

    eventComponent.getElement().parentElement.replaceChild(editEventComponent.getElement(), eventComponent.getElement());
    document.addEventListener(`keydown`, keydownEventHandler);
  };
  btn.addEventListener(`click`, openEditEventHandler);

  btn = editEventComponent.getElement().querySelector(`.event__rollup-btn`);
  btn.addEventListener(`click`, closeEditEventHandler);
  btn = editEventComponent.getElement().querySelector(`.event__save-btn`);
  btn.addEventListener(`click`, closeEditEventHandler);

  utils.render(tripEvents, eventComponent.getElement(), utils.Position.BEFOREEND);
}
