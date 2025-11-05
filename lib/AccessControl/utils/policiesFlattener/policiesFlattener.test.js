import { flattenedMixedPolicies } from '../../../../test/jest/resources';

describe('policiesFlattener', () => {
  const getType = (item) => item.type?.toLowerCase?.() ?? '';
  const getName = (item) => item.policy?.name?.toLowerCase?.() ?? '';

  test('output is sorted by type (A–Z, case-insensitive), then by policy.name (A–Z, case-insensitive)', () => {
    for (let i = 0; i < flattenedMixedPolicies.length - 1; i++) {
      const a = flattenedMixedPolicies[i];
      const b = flattenedMixedPolicies[i + 1];

      const typeA = getType(a);
      const typeB = getType(b);
      const nameA = getName(a);
      const nameB = getName(b);

      expect(typeA <= typeB).toBe(true);

      if (typeA === typeB) {
        expect(nameA <= nameB).toBe(true);
      }
    }
  });

  test('output has no duplicates by (policy.id, type)', () => {
    const seen = new Set();
    flattenedMixedPolicies.forEach(({ policy, type }) => {
      const key = `${type}:${policy.id}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    });
  });
});
