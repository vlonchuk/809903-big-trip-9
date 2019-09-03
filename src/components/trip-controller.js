import * as utils from './../utils';
import Sort from './components/sort';
import columns from './data/columns';
import NoEvent from './components/no-event';
import EditEvent from './components/edit-event';
import Event from './components/event';

export default class TripController {
  constructor(container, route) {
    this._container = container;
    this._route = route;
  }

  renderHeader() {
    if (this._route.length > 0) {
      const sort = new Sort(columns);
      utils.render(this._container, sort.getElement(), utils.Position.BEFOREEND);
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
    this.renderHeader();
    this.renderEvents();
  }
}
