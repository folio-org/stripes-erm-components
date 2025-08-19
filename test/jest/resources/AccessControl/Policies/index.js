import {
  ACQUISITION_UNIT_MEMBER_NON_RESTRICTIVE,
  ACQUISITION_UNIT_MEMBER_RESTRICTIVE,
  ACQUISITION_UNIT_NON_MEMBER_NON_RESTRICTIVE,
  ACQUISITION_UNIT_POLICY_TYPE
} from '../../../../../lib/AccessControl';
import { claimFlattener } from '../../../../../lib/AccessControl/hooks/useClaimPolicies';

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

// Re-export everything from the units
export * from './AcquisitionUnits';

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
export const flattenedPolicies = claimFlattener(claimPolicies.claimPolicies);
