import faker from 'faker';

const list = {
  random(...args) {
    const items = args.length > 0 ? args : [];

    return function () {
      return faker.random.arrayElement(items);
    };
  },

  cycle(...args) {
    const items = args.length > 0 ? args : [];

    return function (i) {
      return items[i % items.length];
    };
  }
};

faker.list = list;

faker.random.number.range = function (min, max) {
  return function (/* i */) {
    return Math.random() * (max - min) + min;
  };
};

export default faker;
