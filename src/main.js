import * as utils from './utils';
import Menu from './components/menu';
import TripInfo from './components/trip-info';
import TripCost from './components/trip-cost';
import Filter from './components/filter';
import TripController from './components/trip-controller';

import {generateTripRoute} from './data/trip-route';
import menuData from './data/menu';
import filterData from './data/filter';

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

utils.render(tripInfoContainer, tripInfo.getElement(), utils.Position.BEFOREEND);
utils.render(tripInfoContainer, tripCost.getElement(), utils.Position.BEFOREEND);
utils.render(menuContainer, menu.getElement(), utils.Position.BEFOREEND);
utils.render(menuContainer, filter.getElement(), utils.Position.BEFOREEND);

const tripController = new TripController(tripEvents, tripRoute);
tripController.init();

