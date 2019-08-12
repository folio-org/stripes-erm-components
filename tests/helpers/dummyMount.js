import { withModules, clearModules } from '@folio/stripes-core/test/bigtest/helpers/stripes-config';

// replace the dummy app to mount the component
export function dummyMount(component, modules = []) {
  clearModules();

  withModules([{
    type: 'app',
    name: '@folio/ui-dummy',
    displayName: 'dummy.title',
    route: '/dummy',
    module: () => component
  }, ...modules]);
}
