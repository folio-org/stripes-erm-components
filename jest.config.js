const path = require('path');
const jestConf = require('@folio/stripes-erm-testing/jest.config');

module.exports = {
  ...jestConf,
  setupFiles: [
    ...jestConf.setupFiles,
    path.join(__dirname, './test/jest/jest.setup.js'),
  ],
};
