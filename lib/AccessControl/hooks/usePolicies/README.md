# usePolicies

## What it does

Fetches the access control policies currently assigned to a specific resource (e.g., which Acquisition Units are
assigned to an Agreement).

## When to use

Use this hook when you need to display or manage the policy assignments for an existing record. It is commonly used in
the "Record Info" section or the "Edit" form of a resource.

## Assumptions

- **Backend Support**: Assumes the backend provides a sub-resource endpoint at
  `${resourceEndpoint}/${resourceId}/policies`.
- **doAccessControl**: This hook does NOT restrict access automatically to policies based on access control. To wire
  this up use queryOptions.enabled = !doAccessControlLoading && doAccessControl.
- **Resource ID**: Requires a `resourceId` to be present to perform the fetch.
- **Sorting**: Assumes the data returned from the backend has an `ownerLevel` property for determining the root level
  policies.
