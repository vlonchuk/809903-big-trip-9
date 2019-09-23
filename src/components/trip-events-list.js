import AbstractComponent from './abstract-component';

export default class TripEventsList extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-events__list">
    </ul>`;
  }
}
