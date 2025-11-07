import {
  ACQUISITION_UNIT_MEMBER_NON_RESTRICTIVE,
  ACQUISITION_UNIT_MEMBER_RESTRICTIVE,
  ACQUISITION_UNIT_NON_MEMBER_NON_RESTRICTIVE,
  ACQUISITION_UNIT_POLICY_TYPE,
  policiesFlattener,
} from '../../../../../lib/AccessControl';

import {
  AUPolicyMain,
  AUPolicyUnrestrictedMember,
  AUPolicyUnrestrictedNonMember,
  AUPolicyRestrictCreateMember,
  AUPolicyRestrictReadMember,
  AUPolicyRestrictUpdateMember,
  AUPolicyRestrictDeleteMember,
  AUPolicyRestrictCreateNonMember,
  AUPolicyRestrictReadNonMember,
  AUPolicyRestrictUpdateNonMember,
  AUPolicyRestrictDeleteNonMember
} from './AcquisitionUnits';

import {
  otherTypePolicies
} from './OtherTypes';

// Re-export everything from the units
export * from './AcquisitionUnits';
export * from './OtherTypes';

export const readPolicies = {
  readPolicies: [
    {
      type: ACQUISITION_UNIT_POLICY_TYPE,
      policies: [
        AUPolicyRestrictReadMember
      ],
      name: ACQUISITION_UNIT_MEMBER_RESTRICTIVE
    },
    {
      type: ACQUISITION_UNIT_POLICY_TYPE,
      policies: [
        AUPolicyMain,
        AUPolicyUnrestrictedNonMember,
        AUPolicyRestrictCreateNonMember,
        AUPolicyRestrictUpdateNonMember,
        AUPolicyRestrictDeleteNonMember
      ],
      name: ACQUISITION_UNIT_NON_MEMBER_NON_RESTRICTIVE
    },
    {
      type: ACQUISITION_UNIT_POLICY_TYPE,
      policies: [
        AUPolicyUnrestrictedMember,
        AUPolicyRestrictCreateMember,
        AUPolicyRestrictUpdateMember,
        AUPolicyRestrictDeleteMember
      ],
      name: ACQUISITION_UNIT_MEMBER_NON_RESTRICTIVE
    }
  ]
};

export const claimPolicies = {
  claimPolicies: [
    {
      type: ACQUISITION_UNIT_POLICY_TYPE,
      policies: [
        AUPolicyRestrictCreateMember
      ],
      name: ACQUISITION_UNIT_MEMBER_RESTRICTIVE
    },
    {
      type: ACQUISITION_UNIT_POLICY_TYPE,
      policies: [
        AUPolicyMain,
        AUPolicyUnrestrictedNonMember,
        AUPolicyRestrictReadNonMember,
        AUPolicyRestrictUpdateNonMember,
        AUPolicyRestrictDeleteNonMember
      ],
      name: ACQUISITION_UNIT_NON_MEMBER_NON_RESTRICTIVE
    },
    {
      type: ACQUISITION_UNIT_POLICY_TYPE,
      policies: [
        AUPolicyUnrestrictedMember,
        AUPolicyRestrictReadMember,
        AUPolicyRestrictUpdateMember,
        AUPolicyRestrictDeleteMember
      ],
      name: ACQUISITION_UNIT_MEMBER_NON_RESTRICTIVE
    }
  ]
};

// I don't like that I've had to do this in the test resources file too
export const flattenedClaimPolicies = policiesFlattener(claimPolicies.claimPolicies);
export const flattenedReadPolicies = policiesFlattener(readPolicies.readPolicies);

export const flattenedOtherTypePolicies = policiesFlattener(otherTypePolicies);

export const mixedPolicies = [
  ...claimPolicies.claimPolicies,
  ...readPolicies.readPolicies,
  ...otherTypePolicies
];

export const flattenedMixedPolicies = policiesFlattener(mixedPolicies);
