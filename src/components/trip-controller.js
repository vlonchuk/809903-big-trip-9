import * as utils from './../utils';
import {COLUMN_SORT_TYPE} from './../data/columns';
import columns from './../data/columns';
import NoEvent from './no-event';
import EventBoard from './event-board';
import EventSort from './event-sort';
import EventList from './event-list';
import EventController from './../components/event-controller';
import TripInfo from './../components/trip-info';
import TripCost from './../components/trip-cost';
import TripDay from './../components/trip-day';
import TripEventsList from './../components/trip-events-list';

export default class TripController {
  constructor(container, route, tripInfoContainer) {
    this._container = container;
    this._route = route;
    this._tripInfoContainer = tripInfoContainer;
    this._activeCol = COLUMN_SORT_TYPE.EVENT;
    this._eventBoard = new EventBoard();
    this._eventSort = new EventSort(columns, this._activeCol);
    this._eventList = new EventList();
    this._subscriptions = [];
    this._tripInfo = new TripInfo(route);
    this._tripCost = new TripCost(route);
    this._days = route.reduce(this.groupByDay, new Map());

    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  getTripDays() {
    if (this._activeCol === COLUMN_SORT_TYPE.TIME) {
      const sortedByTime = this._route.slice().sort((a, b) => (b.endTime - b.startTime) - (a.endTime - a.startTime));
      return (new Map()).set(``, {day: ``, events: sortedByTime});
    } else if (this._activeCol === COLUMN_SORT_TYPE.PRICE) {
      const sortedByPrice = this._route.slice().sort((a, b) => b.price - a.price);
      return (new Map()).set(``, {day: ``, events: sortedByPrice});
    } else {
      return this._route.reduce(this.groupByDay, new Map());
    }
  }

  groupByDay(map, event) {
    if (map.has(event.startDay)) {
      map.get(event.startDay).events.push(event);
    } else {
      map.set(event.startDay, {day: event.startDay, events: [event]});
    }
    return map;
  }

  init() {
    utils.render(this._container, this._eventBoard.getElement(), utils.Position.BEFOREEND);
    utils.render(this._eventBoard.getElement(), this._eventSort.getElement(), utils.Position.AFTERBEGIN);
    utils.render(this._eventBoard.getElement(), this._eventList.getElement(), utils.Position.BEFOREEND);
    utils.render(this._tripInfoContainer, this._tripInfo.getElement(), utils.Position.BEFOREEND);
    utils.render(this._tripInfoContainer, this._tripCost.getElement(), utils.Position.BEFOREEND);

    if (this._route.length > 0) {
      this.renderBoard();
    } else {
      const noEvent = new NoEvent();
      utils.render(this._container, noEvent.getElement(), utils.Position.BEFOREEND);
    }

    this._eventSort.getElement()
      .addEventListener(`click`, (evt) => this._onSortColClick(evt));
  }

  renderBoard() {
    utils.unrender(this._eventList.getElement());
    utils.unrender(this._tripInfo.getElement());
    utils.unrender(this._tripCost.getElement());

    this._eventList.removeElement();
    this._tripInfo.removeElement();
    this._tripCost.removeElement();
    utils.render(this._eventBoard.getElement(), this._eventList.getElement(), utils.Position.BEFOREEND);

    this._days = this.getTripDays();
    this._days.forEach((day) => {
      const dayEl = (new TripDay(day));
      utils.render(this._eventList.getElement(), dayEl.getElement(), utils.Position.BEFOREEND);
      const tripEventsList = new TripEventsList();
      utils.render(dayEl.getElement(), tripEventsList.getElement(), utils.Position.BEFOREEND);
      day.events.forEach((eventData) => this.renderEvent(eventData, tripEventsList));
    });
    utils.render(this._tripInfoContainer, this._tripInfo.getElement(), utils.Position.BEFOREEND);
    utils.render(this._tripInfoContainer, this._tripCost.getElement(), utils.Position.BEFOREEND);

    this._eventSort.getElement()
      .addEventListener(`click`, (evt) => this._onSortColClick(evt));
  }

  renderEvent(eventData, container) {
    const eventController = new EventController(container, eventData, this._onDataChange, this._onChangeView);
    this._subscriptions.push(eventController.setDefaultView.bind(eventController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._route[this._route.findIndex((it) => it === oldData)] = newData;
    this._route = this._route.slice().sort((a, b) => (a.startTime - b.startTime));
    this._tripCost.changeRoute(this._route);
    this._tripInfo.changeRoute(this._route);
    this.renderBoard();
  }

  _onSortColClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    const newActiveCol = evt.target.dataset.sortType;
    if (this._activeCol !== newActiveCol) {
      this._eventList.getElement().innerHTML = ``;
      utils.unrender(this._eventSort.getElement());
      this._eventSort.removeElement();
      this._activeCol = newActiveCol;
      this._eventSort._activeCol = newActiveCol;
      utils.render(this._eventBoard.getElement(), this._eventSort.getElement(), utils.Position.AFTERBEGIN);
      this._eventSort.getElement()
        .addEventListener(`click`, (evt2) => this._onSortColClick(evt2));
      this.renderBoard();
    }
  }
}
