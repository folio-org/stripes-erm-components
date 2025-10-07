import { normalizeClaims, isEqualClaimPolicies } from './compareClaimPolicies';

describe('compareClaimPolicies utils', () => {
  test('normalizeClaims sorts by id then type', () => {
    const input = [
      { policy: { id: 'b' }, type: 'view' },
      { policy: { id: 'a' }, type: 'edit' },
      { policy: { id: 'a' }, type: 'view' },
    ];

    const result = normalizeClaims(input);

    expect(result).toEqual([
      { id: 'a', type: 'edit' },
      { id: 'a', type: 'view' },
      { id: 'b', type: 'view' },
    ]);
  });

  test('isEqualClaimPolicies returns true for same policies in different order', () => {
    const a = [
      { policy: { id: '123' }, type: 'view' },
      { policy: { id: '456' }, type: 'edit' },
    ];
    const b = [
      { policy: { id: '456' }, type: 'edit' },
      { policy: { id: '123' }, type: 'view' },
    ];

    expect(isEqualClaimPolicies(a, b)).toBe(true);
  });

  test('isEqualClaimPolicies returns false when a policy differs', () => {
    const a = [
      { policy: { id: '123' }, type: 'view' },
      { policy: { id: '456' }, type: 'edit' },
    ];
    const b = [
      { policy: { id: '123' }, type: 'view' },
      { policy: { id: '789' }, type: 'edit' },
    ];

    expect(isEqualClaimPolicies(a, b)).toBe(false);
  });

  test('isEqualClaimPolicies treats empty and undefined as equal', () => {
    const a = undefined;
    const b = [];

    expect(isEqualClaimPolicies(a, b)).toBe(true);
  });

  test('isEqualClaimPolicies returns false when one side is empty and the other is not', () => {
    const a = [{ policy: { id: 'x' }, type: 'view' }];
    const b = [];

    expect(isEqualClaimPolicies(a, b)).toBe(false);
  });

  test('normalizeClaims tolerates missing fields by coercing to empty strings', () => {
    const input = [
      { policy: {}, type: 'view' },
      { policy: { id: 'id' } },
      {},
    ];

    const result = normalizeClaims(input);

    expect(result).toEqual([
      { id: '', type: '' },
      { id: '', type: 'view' },
      { id: 'id', type: '' },
    ]);
  });

  test('isEqualClaimPolicies accounts for duplicates (multiset semantics)', () => {
    const a = [
      { policy: { id: 'd' }, type: 't' },
      { policy: { id: 'd' }, type: 't' },
    ];
    const b = [
      { policy: { id: 'd' }, type: 't' },
    ];

    expect(isEqualClaimPolicies(a, b)).toBe(false);
  });
});
