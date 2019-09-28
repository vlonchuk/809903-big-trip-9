import * as utils from './../utils';
import {generateDescription} from './../data/description';
import {generatePhoto} from './../data/photo';
import {availableOptions} from './../data/option';
import EVENT_TYPE from './../data/event-type';
import Event from './event';
import EditEvent from './edit-event';
import EventData from './../data/event-data';

export default class EventController {
  constructor(container, eventData, onDataChange, onChangeView) {
    this._container = container;
    this._eventData = eventData;
    this._eventComponent = new Event(eventData);
    this._editEventComponent = new EditEvent(eventData);
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this.create();
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === utils.Keys.ESCAPE) {
      this._editEventComponent.clear();
      this._container.getElement().replaceChild(this._eventComponent.getElement(), this._editEventComponent.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  create() {
    // Открытие формы редактирования события
    this._eventComponent.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onChangeView();
        this._container.getElement().replaceChild(this._editEventComponent.getElement(), this._eventComponent.getElement());
        document.addEventListener(`keydown`, this._onEscKeyDown);
      });

    this._editEventComponent.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.getElement().replaceChild(this._eventComponent.getElement(), this._editEventComponent.getElement());
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      });

    // Нажатие на кнопку "Save" в карточке события
    this._editEventComponent.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        // код для получения данных с формы
        const formData = new FormData(this._editEventComponent.getElement().querySelector(`.event--edit`));

        const entry = {
          type: EVENT_TYPE.find((type) => type.name === formData.get(`event-type`)),
          city: formData.get(`event-destination`),
          startTime: utils.strToDate(formData.get(`event-start-time`)).getTime(),
          endTime: utils.strToDate(formData.get(`event-end-time`)).getTime(),
          price: parseFloat(formData.get(`event-price`)),
          description: generateDescription(),
          options: formData.getAll(`event-offer`)
                     .map((offerName) => availableOptions
                     .find((option) => option.name === offerName)),
          photo: generatePhoto()
        };

        this._onDataChange(new EventData(entry), this._eventData);

        document.removeEventListener(`keydown`, this._onEscKeyDown);
      });

    utils.render(this._container.getElement(), this._eventComponent.getElement(), utils.Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._editEventComponent.getElement())) {
      this._container.getElement().replaceChild(this._eventComponent.getElement(), this._editEventComponent.getElement());
    }
  }
}
