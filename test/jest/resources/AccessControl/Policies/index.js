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

// The response from /erm/entitlement/{id}/policies, specifically... for use in testing usePolicies
// This is currently unused, as we are directly mocking usePolicies returning lists of
// policies instead of the more nuanced owner shape below, which is fine as currently usePolicies returns "rootPolicies"
// in place of the policies list in its entirety.
export const policiesForResource = [
  {
    ownerLevel: 0,
    resourceClass: 'org.olf.erm.Entitlement',
    ownerId: '4e2dec23-e288-492f-aadc-53a2741b614e', // For now this is a made up value
    policies: []
  },
  {
    ownerLevel: 1,
    resourceClass: 'org.olf.erm.SubscriptionAgreement',
    ownerId: '8e6d0838-14f8-4a74-b8c5-28c17af70230', // For now this is a made up value
    policies: [
      {
        id: '1126f660-162d-4598-b6b3-53dbaa84b304', // This corresponds to AccessControlEntity, but that
        policy: AUPolicyRestrictUpdateMember,
        type: ACQUISITION_UNIT_POLICY_TYPE,
        description: 'Restricts edit (and is member)'
      }
    ]
  }
];
