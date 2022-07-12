import '../../test/jest/__mock__';
import getResourceIdentifier from './getResourceIdentifier';

const identifier = {
  'value':'2065743-2',
  'ns':{
    'value':'zdb'
  }
};

describe('getResourceIdentifier', () => {
  test('getResourceIdentifier function passes the expected values', () => {
    getResourceIdentifier('{{value}}', identifier);
    getResourceIdentifier('{{value.ns.value}}', identifier);
  });

  test('getResourceIdentifier function passes the expected identifier value', () => {
    expect(identifier.value).toBe('2065743-2');
  });

  test('getResourceIdentifier function passes the expected ns value', () => {
    expect(identifier.ns.value).toBe('zdb');
  });
});
