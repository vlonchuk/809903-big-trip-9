import {generateEventData} from './../data/event';

export const generateTripRoute = () => {
  const result = new Array(1 + Math.floor(Math.random() * 10));
  let prevTime = Date.now();
  for (let i = 0; i < result.length; i++) {
    result[i] = generateEventData(prevTime);
    prevTime = result[i].endTime;
  }
  return result;
};
