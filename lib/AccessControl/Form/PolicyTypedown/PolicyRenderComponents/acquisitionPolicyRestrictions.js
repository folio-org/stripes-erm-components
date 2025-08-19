export const acquisitionPolicyRestrictions = (policy, intl) => ['protectRead', 'protectUpdate', 'protectCreate', 'protectDelete'].map(restriction => {
  return policy[restriction] ? intl.formatMessage({ id: `stripes-erm-components.accesscontrol.acquisitionunits.${restriction}` }) : null;
}).filter(Boolean).join(', ');
