import AbstractComponent from './abstract-component';

export default class EventList extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-days">
    </ul>`;
  }
}
