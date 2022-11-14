import getResourceIdentifier from './getResourceIdentifier';
import { eresourceOne, eresourceTwo } from './testResources';

describe('getResourceIdentifier', () => {
  test('getResourceIdentifier function passes empty eresource as expected', () => {
    const output = getResourceIdentifier({}, 'issn');
    expect(output).toBe(undefined);
  });

  test('getResourceIdentifier function passes eresource without zdb namespace value as expected', () => {
    const output = getResourceIdentifier(eresourceTwo, 'zdb');
    expect(output).toBe(undefined);
  });

  test('getResourceIdentifier function passes the expected identifier string value', () => {
    const output = getResourceIdentifier(eresourceOne, 'issn');
    expect(output).toBe('2190-5738');
  });

  test('getResourceIdentifier function passes the expected identifier values as an array', () => {
    const output = getResourceIdentifier(eresourceTwo, 'isbn', true);
    expect(output).toStrictEqual(['9781843761396', '9781843761397']);
  });
});
