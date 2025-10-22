const { policiesFlattener: mockPoliciesFlattener } = require('../../../../utils');
const { readPolicies } = require('../../../../../../test/jest/resources');

module.exports = jest.fn(() => ({
  flattenedPolicies: mockPoliciesFlattener(readPolicies.readPolicies),
  policies: readPolicies
}));
