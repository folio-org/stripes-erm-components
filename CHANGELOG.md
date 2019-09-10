# Change history for stripes-erm-components

## 1.7.2 2019-09-10
* Fixed console errors for prop-types and lack of keys.

## 1.7.1 2019-09-09
* Fixed `UserField` to show error messages.

## 1.7.0 2019-09-06
* Fixed `DocumentsFieldArray` uploader dropzone resizing behaviour. ERM-295
* Fixed `withKiwtFieldArray` not handling delete-then-append flows correctly. ERM-420
* Fixed `LicenseCard` not maintaining query params when linking within Licenses app. ERM-353
* Added `InternalContactSelection` component. ERM-421
* Fixed `FileUploaderField` to force line-breaks for long filenames. ERM-432
* Updated `ViewOrganizationCard` to show interface username/password.

## 1.6.0 2019-08-20
* `InternalContactsFieldArray` renders users as a card. ERM-309
* Bumped `eslint-config-stripes` dependency to 4.2.0
* Added `InternalContactCard` component. ERM-309
* Added support for `mod-organizations-storage` version 2.0

## 1.5.5 2019-08-09
* Moved `FileUploaderField` into its own component. ERM-337

## 1.5.4 2019-07-24
* Removed `devDependencies` on stripes-components and stripes-core.

## 1.5.3 2019-07-24
* `LicenseCard` no longer converts the timezone of the start date.

## 1.5.2 2019-07-23
* `OrganizationsFieldArray` supports `uniqueRole` prop. ERM-344

## 1.5.1 2019-07-23
* `LicenseEndDate` no longer converts the timezone.

## 1.5.0 2019-07-22

* `FileUploaderField` now shows maximum file size. ERM-312
* `LicenseCard` links to the license record. ERM-319
* `ViewOrganizationCard` interface links open in a new tab. ERM-320
* `DocumentCard` is rendered using a `Card`. ERM-304
* `OrganizationSelection` renders the list of organizations alphabetically. ERM-323
* `FileUploader` renders a `Spinner` when file upload is in progress. ERM-278
* `OrganizationsFieldArray` uses a new `Card`-based layout. ERM-281, ERM-282
* `getSASParams` passes props received from stripes-connect into the `queryGetter` callback. Available from v1.4.1.

## 1.4.0 2019-06-11

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

## 1.3.0 2019-03-21

* Added `LicenseTermsList` component. Avail in 1.2.1.

## 1.2.0 2019-03-18

* Updated translation strings.

## 1.1.0 2019-03-08

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
