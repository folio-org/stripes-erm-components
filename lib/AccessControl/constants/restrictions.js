export const READ = 'read';
export const CREATE = 'create';
export const DELETE = 'delete';
export const UPDATE = 'update';
export const CLAIM = 'claim';
export const APPLY_POLICIES = 'apply_policies';

export const CAN_READ = 'canRead';
export const CAN_CREATE = 'canCreate';
export const CAN_DELETE = 'canDelete';
export const CAN_UPDATE = 'canUpdate';
export const CAN_APPLY_POLICIES = 'canApplyPolicies';

// Helper method to go between the above, potentially slightly overkill
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
