# usePolicies

## What it does
Fetches the access control policies currently assigned to a specific resource (e.g., which Acquisition Units are assigned to an Agreement).

## When to use
Use this hook when you need to display or manage the policy assignments for an existing record. It is commonly used in the "Record Info" section or the "Edit" form of a resource.

## Assumptions
- **Backend Support**: Assumes the backend provides a sub-resource endpoint at `${resourceEndpoint}/${resourceId}/policies`.
- **doAccessControl**: By default, `doAccessControl` is `false`. When `false`, the hook returns an empty array of policies and skips the network call.
- **Resource ID**: Requires a `resourceId` to be present to perform the fetch.
- **Sorting**: Assumes the data returned from the backend has an `ownerLevel` property for determining the root level policies.
