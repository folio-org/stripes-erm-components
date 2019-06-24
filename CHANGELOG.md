# Change history for stripes-erm-components

## 1.5.0 (IN PROGRESS)

* `getSASParams` passes props received from stripes-connect into the `queryGetter` callback. Available from v1.4.1.

## 1.4.0 (11-06-2019)

* Added `withKiwtFieldArray` higher-order component. Avail in 1.3.0.
* Added `Tags` component. Avail in 1.3.1.
* Changed `DocumentsFieldArray` component to support `atType`. Avail in 1.3.2.
* Changed `DocumentCard` component to support `atType`. Avail in 1.3.2.
* Added `queryGetter` option to `getSASParams`. Avail in 1.3.3.
* Turned off sideEffects to enable tree-shaking for production builds. Refs STRIPES-564 and STRIPES-581.
* Added `InternalContactsFieldArray` component. Avail in 1.3.4.
* Changed `LicenseTermsList` component to render `note`. Avail in 1.3.5.
* Added `Card` component. Avail in 1.3.5.
* Changed `DocumentsFieldArray` to support attaching files. Avail in 1.3.6.

## 1.3.0

* Added `LicenseTermsList` component. Avail in 1.2.1.

## 1.2.0 (18-03-2019)

* Updated translation strings.

## 1.1.0 (08-03-2019)

* Added `OrganizationSelection` component.
* Added `CreateOrganizationModal` component. Avail in 1.0.1.
* Changed `OrganizationSelection` component to support `path` prop. Avail in 1.0.2.
* Changed `CreateOrganizationModal` component to support `path` prop. Avail in 1.0.2.
* Added `DocumentCard` component. Avail in 1.0.4.
* Added `Spinner` component. Avail in 1.0.4.
* Added `DocumentsFieldArray` component. Avail in 1.0.5.
* Added `LicenseCard` component. Avail in 1.0.6.
* Added `LicenseEndDate` component. Avail in 1.0.7.
* Changed `getSASParams` to support `qindex`.
* Changed `getSASParams` to support multiple `match` params.
