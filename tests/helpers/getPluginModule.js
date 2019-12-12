export default (Module, pluginType) => ({
  type: 'plugin',
  name: '@folio/ui-plugin-dummy',
  displayName: 'dummy.title',
  pluginType,
  module: Module
});
