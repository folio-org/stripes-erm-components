# useCanAccess

## What it does

Checks if the current user has a specific restriction-based permission (e.g., READ, CREATE, UPDATE, DELETE) for a given
resource.

## When to use

Use this hook when you need to perform a specific access check for an action. For example, checking if a user can delete
a specific Agreement or create a new License.

## Assumptions

- **Backend Support**: Assumes the backend provides endpoints in the format
  `resourceEndpoint/resourceId/can<Restriction>` or `resourceEndpoint/can<Restriction>` (for CREATE).
- **doAccessControl**: This hook does NOT restrict access automatically to policies based on access control. To wire
  this up use queryOptions.enabled = !doAccessControlLoading && doAccessControl.
- **Enabled Engines**: This hook should ideally be used in conjunction with `useDoAccessControl`. The `doAccessControl`
  prop should be passed based on whether any access control engines are active.
