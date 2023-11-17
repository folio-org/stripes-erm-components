import getSiblingIdentifier from './getSiblingIdentifier';
import { eresource, missingType, type } from './testResources';

describe('getSiblingIdentifier', () => {
  test('getSiblingIdentifier function passes empty eresource as expected', () => {
    const output = getSiblingIdentifier({}, type);
    expect(output).toBe(undefined);
  });

  test('getSiblingIdentifier function passes eresource without print siblings as expected', () => {
    const output = getSiblingIdentifier({}, missingType);
    expect(output).toBe(undefined);
  });

  test('getSiblingIdentifier function passes the expected identifier value', () => {
    const output = getSiblingIdentifier(eresource, type);
    expect(output).toBe('2190-572X');
  });
});
