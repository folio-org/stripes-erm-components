import { isEqual } from 'lodash';

export const normalizeClaims = (list = []) => list
  .map(p => ({
    id: p?.policy?.id ?? '',
    type: p?.type ?? ''
  }))
  .sort((a, b) => {
    if (a.id === b.id) return a.type.localeCompare(b.type);
    return a.id.localeCompare(b.id);
  });

export const isEqualClaimPolicies = (a = [], b = []) => isEqual(normalizeClaims(a), normalizeClaims(b));
