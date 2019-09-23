const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const Keys = {
  ESCAPE: 27
};

// Рендер и анрендер для компонент
const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

const strToDate = (strDate) => {
  // 15/09/19 23:46
  const day = strDate.substring(0, 2);
  const month = strDate.substring(3, 5);
  const year = 2000 + parseInt(strDate.substring(6, 8), 10);
  const hour = strDate.substring(9, 11);
  const min = strDate.substring(12, 14);
  return new Date(year, month, day, hour, min);
};

export {createElement, Position, render, unrender, Keys, strToDate};
