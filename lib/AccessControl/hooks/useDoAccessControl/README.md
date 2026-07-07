# useDoAccessControl

## What it does
Checks the `/enabledEngines` endpoint to determine if any access control engines (like Acquisition Units) are currently active for the module.

## When to use
This is a utility hook used to guard other access control calls. It should be used at the route or high-level component level to determine if subsequent calls to `/canAll`, `/policies`, etc., are even necessary.

## Assumptions
- **Backend Support**: Assumes the backend provides an `${endpoint}/enabledEngines` endpoint that returns a map of engine names to boolean values (e.g., `{ ACQ_UNIT: true }`).
- **Optimization**: If no engines are enabled, it sets `doAccessControl` to `false`, which allows dependent hooks to skip network calls and default to "full access".
