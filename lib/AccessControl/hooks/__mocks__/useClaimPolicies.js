import { claimPolicies as mockClaimPolicies } from '../../../../test/jest/resources';

jest.mock('react-query', () => ({
  useQuery: () => ({ data: mockClaimPolicies }),
}));

module.exports = jest.requireActual('../useClaimPolicies');
