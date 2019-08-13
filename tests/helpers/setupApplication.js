import { beforeEach } from '@bigtest/mocha';
import setupStripesCore from '@folio/stripes-core/test/bigtest/helpers/setup-application';
import mirageOptions from '../network';
import translations from '../../translations/stripes-erm-components/en';

function prefixKeys(obj) {
  const res = {};
  for (const key of Object.keys(obj)) {
    res[`stripes-erm-components.${key}`] = obj[key];
  }

  return res;
}

export function setupApplication({
  scenarios
} = {}) {
  setupStripesCore({
    mirageOptions,
    scenarios,
    translations: { 'dummy.title': 'Dummy', ...prefixKeys(translations) },
    modules: [{
      type: 'app',
      name: '@folio/ui-dummy',
      displayName: 'dummy.title',
      route: '/dummy',
      module: null
    }],

  });

  // go to the dummy app where smart components are mounted
  beforeEach(function () { // eslint-disable-line func-names
    this.visit('/dummy');
  });
}
