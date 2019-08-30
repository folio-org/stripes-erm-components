import 'babel-polyfill'
import turnOffWarnings from './helpers/turn-off-warnings';

turnOffWarnings();

// require all test files matching 'lib/**/tests/*-test'
const requireTest = require.context('../lib/', true, /(.*?)\/tests\/(.*?)-test/);
requireTest.keys().forEach(requireTest);
