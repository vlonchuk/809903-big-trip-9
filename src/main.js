import * as utils from './utils';
import Menu from './components/menu';
import Filter from './components/filter';
import TripController from './components/trip-controller';

import {generateTripRoute} from './data/trip-route';
import menuData from './data/menu';
import filterData from './data/filter';

const tripMain = document.querySelector(`.trip-main`);
const tripInfoContainer = tripMain.querySelector(`.trip-main__trip-info `);
const mainBlock = tripMain.querySelector(`.trip-main__trip-controls`);
const menuContainer = mainBlock;
const tripEventsContainer = document.querySelector(`main .page-body__container`);

const tripRoute = generateTripRoute();
const menu = new Menu(menuData);
const filter = new Filter(filterData);

utils.render(menuContainer, menu.getElement(), utils.Position.BEFOREEND);
utils.render(menuContainer, filter.getElement(), utils.Position.BEFOREEND);

const tripController = new TripController(tripEventsContainer, tripRoute, tripInfoContainer);
tripController.init();

