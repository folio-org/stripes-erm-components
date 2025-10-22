const { policiesFlattener: mockPoliciesFlattener } = require('../../../../utils');
const { claimPolicies } = require('../../../../../../test/jest/resources');

module.exports = jest.fn(() => ({
  flattenedPolicies: mockPoliciesFlattener(claimPolicies.claimPolicies),
  policies: claimPolicies
}));
