import '../../test/jest/__mock__';
import getResourceIdentifier from './getResourceIdentifier';
import { eresourceOne, eresourceTwo, typeOne, typeTwo } from './testResources';

describe('getResourceIdentifier', () => {
  test('getResourceIdentifier function passes empty eresource as expected', () => {
    const output = getResourceIdentifier({}, typeOne);
    expect(output).toBe(undefined);
  });

  test('getResourceIdentifier function passes eresource without zdb namespace value as expected', () => {
    const output = getResourceIdentifier(eresourceTwo, 'zdb');
    expect(output).toBe(undefined);
  });

  test('getResourceIdentifier function passes the expected identifier string value', () => {
    const output = getResourceIdentifier(eresourceOne, typeOne);
    expect(output).toBe('2190-5738');
  });

  test('getResourceIdentifier function passes the expected identifier values as an array', () => {
    const output = getResourceIdentifier(eresourceTwo, typeTwo, true);
    expect(output).toStrictEqual(['9781843761396', '9781843761397']);
  });
});
