import AbstractComponent from './abstract-component';

export default class EventList extends AbstractComponent {
  getTemplate() {
    return `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <!-- Сортировка -->

    <!-- Контент -->
  </section>    
    `;
  }
}
