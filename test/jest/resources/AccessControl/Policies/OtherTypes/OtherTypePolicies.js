// test/jest/resources/OtherTypePolicies.js

export const OTHER_POLICY_TYPE = 'OTHER_TYPE';

export const OtherPolicyAlpha = {
  id: '11111111-1111-1111-1111-111111111111',
  name: 'Alpha',
  description: 'Other type alpha',
  protectCreate: false,
  protectDelete: false,
  protectRead: false,
  protectUpdate: false,
  isMember: false,
  deleted: false
};

export const OtherPolicyBeta = {
  id: '22222222-2222-2222-2222-222222222222',
  name: 'beta',
  description: 'Other type beta',
  protectCreate: true,
  protectDelete: false,
  protectRead: false,
  protectUpdate: false,
  isMember: false,
  deleted: false
};

export const otherTypePolicies = [
  {
    type: OTHER_POLICY_TYPE,
    policies: [OtherPolicyAlpha],
    name: 'OTHER_TYPE_NON_MEMBER_NON_RESTRICTIVE'
  },
  {
    type: OTHER_POLICY_TYPE,
    policies: [OtherPolicyBeta],
    name: 'OTHER_TYPE_MEMBER_NON_RESTRICTIVE'
  }
];
