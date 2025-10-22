export const READ = 'read';
export const CREATE = 'create';
export const DELETE = 'delete';
export const UPDATE = 'update';
export const CLAIM = 'claim';
export const APPLY_POLICIES = 'apply_policies';

export const RESTRICTIONS = [
  READ,
  CREATE,
  DELETE,
  UPDATE,
  CLAIM,
  APPLY_POLICIES,
];

export const READ_POLICIES = 'readPolicies';
export const CREATE_POLICIES = 'createPolicies';
export const DELETE_POLICIES = 'deletePolicies';
export const UPDATE_POLICIES = 'updatePolicies';
export const CLAIM_POLICIES = 'claimPolicies';
export const APPLY_POLICIES_POLICIES = 'applyPolicies';

export const RESTRICTION_POLICIES = [
  READ_POLICIES,
  CREATE_POLICIES,
  DELETE_POLICIES,
  UPDATE_POLICIES,
  CLAIM_POLICIES,
  APPLY_POLICIES_POLICIES,
];

export const CAN_READ = 'canRead';
export const CAN_CREATE = 'canCreate';
export const CAN_DELETE = 'canDelete';
export const CAN_UPDATE = 'canUpdate';
export const CAN_APPLY_POLICIES = 'canApplyPolicies';

// Helper methods to go from restriction -> canAccess or restrictionPolicies. Potentially slightly overkill
export const getCanAccessFromRestriction = (restriction) => {
  switch (restriction) {
    case READ:
      return CAN_READ;
    case CREATE:
      return CAN_CREATE;
    case DELETE:
      return CAN_DELETE;
    case UPDATE:
      return CAN_UPDATE;
    case APPLY_POLICIES:
      return CAN_APPLY_POLICIES;
    default:
      return null;
  }
};

export const getPoliciesFromRestriction = (restriction) => {
  switch (restriction) {
    case READ:
      return READ_POLICIES;
    case CREATE:
      return CREATE_POLICIES;
    case DELETE:
      return DELETE_POLICIES;
    case UPDATE:
      return UPDATE_POLICIES;
    case CLAIM:
      return CLAIM_POLICIES;
    case APPLY_POLICIES:
      return APPLY_POLICIES_POLICIES;
    default:
      return null;
  }
};
