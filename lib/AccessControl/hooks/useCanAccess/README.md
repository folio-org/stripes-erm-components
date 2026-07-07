# useCanAccess

## What it does
Checks if the current user has a specific restriction-based permission (e.g., READ, CREATE, UPDATE, DELETE) for a given resource.

## When to use
Use this hook when you need to perform a specific access check for an action. For example, checking if a user can delete a specific Agreement or create a new License.

## Assumptions
- **Backend Support**: Assumes the backend provides endpoints in the format `resourceEndpoint/resourceId/can<Restriction>` or `resourceEndpoint/can<Restriction>` (for CREATE).
- **doAccessControl**: By default, `doAccessControl` is `false`. When `false`, the hook assumes full access (`true` for all checks) and makes no network calls.
- **Enabled Engines**: This hook should ideally be used in conjunction with `useDoAccessControl`. The `doAccessControl` prop should be passed based on whether any access control engines are active.
