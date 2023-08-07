const jestConf = require('@folio/stripes-erm-testing/jest.config');

// Default config defines some esModules, put any extras specific to our modules here
const extraESModules = ['@folio', 'ky', '@k-int'].join('|');

module.exports = {
  ...jestConf,
  transformIgnorePatterns: [
    `/node_modules/(?!${extraESModules})`
  ],
};
