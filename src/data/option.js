const OPTION = [
  {
    name: `luggage`,
    description: `Add luggage`,
    price: 10,
    used: false
  },
  {
    name: `comfort`,
    description: `Switch to comfort class`,
    price: 150,
    used: false
  },
  {
    name: `meal`,
    description: `Add meal`,
    price: 2,
    used: false
  },
  {
    name: `seats`,
    description: `Choose seats`,
    price: 9,
    used: false
  },
  {
    name: `train`,
    description: `Travel by tain`,
    price: 40,
    used: false
  }
];

export {OPTION as availableOptions};
export const generateOptions = (maxCount) => {
  if (maxCount > OPTION.length) {
    maxCount = OPTION.length;
  }
  const optionCount = Math.floor(Math.random() * (maxCount + 1));
  const result = new Array(optionCount);
  let options = OPTION.slice(0, OPTION.length - 1);

  for (let i = 0; i < optionCount; i++) {
    let randIndex = Math.floor(Math.random() * options.length);
    result[i] = options[randIndex];
    options.splice(randIndex, 1);
  }
  return result;
};

