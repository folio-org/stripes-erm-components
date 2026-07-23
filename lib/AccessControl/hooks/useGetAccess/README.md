# useGetAccess

## What it does

A convenience hook that aggregates multiple access control checks into a single result. It combines:

1. `useDoAccessControl` (Engine check)
2. `useCanAccess` (Permission check for 'ALL')
3. `usePolicies` (Applied policies check)

## When to use

This is the primary hook to use at the Route level for viewing or editing a resource. It provides all the necessary
information (loading states, permissions, and assigned policies) to determine what parts of the UI should be visible or
editable.

## Assumptions

- **All-in-one**: Assumes that for a standard resource view/edit, you want to know both "what can I do?" and "what
  policies are already here?".
- **Default Permissions**: If no engines are enabled, it will correctly report full permissions without making
  unnecessary calls to the backend.
- **Resource Context**: Requires both `accessControlEndpoint` (for engine checks) and `resourceEndpoint` (for
  permission/policy checks).
