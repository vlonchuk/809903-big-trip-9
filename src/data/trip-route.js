import {generateEventData} from './../data/event';

const MIN_EVENT_COUNT = 0;
const MAX_EVENT_COUNT = 3;

export const generateTripRoute = () => {
  const result = new Array(MIN_EVENT_COUNT + Math.floor(Math.random() * MAX_EVENT_COUNT));
  let prevTime = Date.now();
  for (let i = 0; i < result.length; i++) {
    result[i] = generateEventData(prevTime);
    prevTime = result[i].endTime;
  }
  return result;
};
