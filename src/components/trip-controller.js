import * as utils from './../utils';
import Sort from './sort';
import {COLUMN_SORT_TYPE} from './../data/columns';
import columns from './../data/columns';
import NoEvent from './no-event';
import EditEvent from './edit-event';
import Event from './event';

export default class TripController {
  constructor(container, route) {
    this._container = container;
    this._route = route;
    this._activeCol = COLUMN_SORT_TYPE.EVENT;
  }

  sortColClickHandler(evt) {
    evt.preventDefault();
    const newActiveCol = evt.currentTarget.dataset.sortType;
    if (this._activeCol !== newActiveCol) {
      switch (newActiveCol) {
        case COLUMN_SORT_TYPE.EVENT:
          this._route = this._route.sort((a, b) => a.startTime - b.startTime);
          break;
        case COLUMN_SORT_TYPE.TIME:
          this._route = this._route.sort((a, b) => (b.endTime - b.startTime) - (a.endTime - a.startTime));
          break;
        case COLUMN_SORT_TYPE.PRICE:
          this._route = this._route.sort((a, b) => b.price - a.price);
          break;
      }
      this._activeCol = newActiveCol;
      this.init();
    }
  }

  renderHeader() {
    if (this._route.length > 0) {
      const sort = new Sort(columns, this._activeCol);
      utils.render(this._container, sort.getElement(), utils.Position.BEFOREEND);
      for (let col of columns) {
        let el = sort.getElement().querySelector(`#sort-${col.name}`);
        if (el && col.sortable) {
          el.addEventListener(`click`, this.sortColClickHandler.bind(this));
        }
      }
    } else {
      const noEvent = new NoEvent();
      utils.render(this._container, noEvent.getElement(), utils.Position.BEFOREEND);
    }
  }

  renderEvents() {
    for (let event of this._route) {
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

      utils.render(this._container, eventComponent.getElement(), utils.Position.BEFOREEND);
    }
  }

  init() {
    this._container.innerHTML = ``;
    this.renderHeader();
    this.renderEvents();
  }
}
