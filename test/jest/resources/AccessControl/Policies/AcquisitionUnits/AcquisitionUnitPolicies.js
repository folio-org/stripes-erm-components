import {
  ACQUISITION_UNIT_MEMBER_NON_RESTRICTIVE,
  ACQUISITION_UNIT_MEMBER_RESTRICTIVE,
  ACQUISITION_UNIT_NON_MEMBER_NON_RESTRICTIVE,
  ACQUISITION_UNIT_POLICY_TYPE
} from '../../../../../../lib/AccessControl';
import { claimFlattener } from '../../../../../../lib/AccessControl/hooks/useClaimPolicies';

export const AUPolicyMain = {
  id: '0ebb1f7d-983f-3026-8a4c-5318e0ebc041',
  name: 'main',
  protectCreate: true,
  protectDelete: true,
  protectRead: false,
  protectUpdate: true,
  isMember: false,
  deleted: false
};

export const AUPolicyUnrestrictedNonMember = {
  id: '6890621f-ace3-43e4-b37b-93a6f4558852',
  name: 'Unrestricted (non member)',
  description: 'An unrestricted acquisition unit, user is not a member',
  protectCreate: false,
  protectDelete: false,
  protectRead: false,
  protectUpdate: false,
  isMember: false,
  deleted: false
};

export const AUPolicyUnrestrictedMember = {
  id: 'a60b6d4f-1567-4ea2-ab6d-6c55f4214018',
  name: 'Unrestricted (member)',
  description: 'An unrestricted acquisition unit, user is a member',
  protectCreate: false,
  protectDelete: false,
  protectRead: false,
  protectUpdate: false,
  isMember: true,
  deleted: false
};

export const AUPolicyRestrictReadMember = {
  id: '0da4a697-9d5f-4ae6-8860-95cb280f507e',
  name: 'Restrict read (member)',
  description: 'An acquisition unit restricting read, user is a member',
  protectCreate: false,
  protectDelete: false,
  protectRead: true,
  protectUpdate: false,
  isMember: true,
  deleted: false
};

export const AUPolicyRestrictReadNonMember = {
  id: '0da4a697-9d5f-4ae6-8860-95cb280f507e',
  name: 'Restrict read (non member)',
  description: 'An acquisition unit restricting read, user is not a member',
  protectCreate: false,
  protectDelete: false,
  protectRead: true,
  protectUpdate: false,
  isMember: false,
  deleted: false
};

export const AUPolicyRestrictCreateMember = {
  id: 'b03ece0c-a2b4-4025-868c-f7e67b1a5401',
  name: 'Restrict create (member)',
  description: 'An acquisition unit restricting create, user is a member',
  protectCreate: true,
  protectDelete: false,
  protectRead: false,
  protectUpdate: false,
  isMember: true,
  deleted: false
};

export const AUPolicyRestrictCreateNonMember = {
  id: 'b9ac6f64-2ff1-4925-8461-a6024b5196ba',
  name: 'Restrict create (non member)',
  description: 'An acquisition unit restricting create, user is not a member',
  protectCreate: true,
  protectDelete: false,
  protectRead: false,
  protectUpdate: false,
  isMember: false,
  deleted: false
};

export const AUPolicyRestrictUpdateMember = {
  id: 'ce9c4cf9-c41f-4e49-8872-ac970fcbba12',
  name: 'Restrict update (member)',
  description: 'An acquisition unit restricting update, user is a member',
  protectCreate: false,
  protectDelete: false,
  protectRead: false,
  protectUpdate: true,
  isMember: true,
  deleted: false
};

export const AUPolicyRestrictUpdateNonMember = {
  id: 'd63e7f66-be79-46a7-a611-dd8124100bde',
  name: 'Restrict update (non member)',
  description: 'An acquisition unit restricting update, user is not a member',
  protectCreate: false,
  protectDelete: false,
  protectRead: false,
  protectUpdate: true,
  isMember: false,
  deleted: false
};

export const AUPolicyRestrictDeleteMember = {
  id: 'ff2f0392-605b-436c-bed3-3d695984fb80',
  name: 'Restrict delete (member)',
  description: 'An acquisition unit restricting delete, user is a member',
  protectCreate: false,
  protectDelete: true,
  protectRead: false,
  protectUpdate: false,
  isMember: true,
  deleted: false
};

export const AUPolicyRestrictDeleteNonMember = {
  id: '2213bad7-fa1b-4a00-8d7c-f057d5f057b6',
  name: 'Restrict delete (non member)',
  description: 'An acquisition unit restricting delete, user is not a member',
  protectCreate: false,
  protectDelete: true,
  protectRead: false,
  protectUpdate: false,
  isMember: false,
  deleted: false
};

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
