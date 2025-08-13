export interface Policy {
  /** The identification string for this Policy. */
  id: string;
}

export interface BasicPolicy extends Policy {
  // Nothing extra — just the `id` field.
}

export type AcquisitionUnitRestrictions = 'protectRead' | 'protectUpdate' | 'protectCreate' | 'protectDelete';

export interface AcquisitionUnit {
  id: string;
  isDeleted: boolean;
  name: string;
  description?: string | null;
  protectCreate: boolean;
  protectDelete: boolean;
  protectRead: boolean;
  protectUpdate: boolean;
}

export interface AcquisitionUnitPolicy extends AcquisitionUnit, Policy {
  /** Whether the user is a member of this acquisition unit. */
  isMember: boolean;
}

export type AnyPolicy = BasicPolicy | AcquisitionUnitPolicy;


export type AccessPolicyType = 'ACQ_UNITS' | 'KI_GRANT';

export interface PolicyLink<TPolicy extends Policy = Policy> {
  id: string;

  policy: TPolicy;

  type: AccessPolicyType;

  description: string;
}
