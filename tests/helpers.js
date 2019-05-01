import { beforeEach } from '@bigtest/mocha';
import setupStripesCore from '@folio/stripes-core/test/bigtest/helpers/setup-application';
import { withModules, clearModules } from '@folio/stripes-core/test/bigtest/helpers/stripes-config';
import React from 'react';
import ReactDOM from 'react-dom';
import Harness from './Harness';
import mirageOptions from './network';
import translations from '../translations/stripes-erm-components/en';

function getCleanTestingRoot() {
  let $root = document.getElementById('root');

  // if a root exists, unmount anything inside and remove it
  if ($root) {
    ReactDOM.unmountComponentAtNode($root);
    $root.parentNode.removeChild($root);
  }

  // create a brand new root element
  $root = document.createElement('div');
  $root.id = 'root';

  document.body.appendChild($root);

  return $root;
}

export function mount(component) {
  return new Promise(resolve => {
    ReactDOM.render(component, getCleanTestingRoot(), resolve);
  });
}

export function mountWithContext(component) {
  return new Promise(resolve => {
    ReactDOM.render(<Harness>{component}</Harness>, getCleanTestingRoot(), resolve);
  });
}

export function selectorFromClassnameString(str) {
  return str.replace(/\s/, '.');
}
   
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

// replace the dummy app to mount the component
export function dummyMount(component) {
  clearModules();

  withModules([{
    type: 'app',
    name: '@folio/ui-dummy',
    displayName: 'dummy.title',
    route: '/dummy',
    module: () => component
  }]);
}
