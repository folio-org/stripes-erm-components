# useRestrictionPolicies

## What it does

Fetches all available policies that could be assigned for a specific restriction type (e.g., fetching all available
Acquisition Units that a user can choose from when creating/editing a record).

## When to use

Use this hook in forms, typically with a typedown or selection component, where a user needs to select a policy to apply
to a record.

## Assumptions

- **Backend Support**: Assumes the backend provides an endpoint for the requested restriction type (e.g.,
  `endpoint/claimPolicies` or `endpoint/readPolicies`).
- **doAccessControl**: This hook makes a call to enabledEngines to automatically turn off the useRestrictionPolicies
  calls when accessControl is not enabled.
- **Data Shape**: Expects the backend to return an object where the key matches the restriction policies string (e.g.,
  `{ claimPolicies: [...] }`).
