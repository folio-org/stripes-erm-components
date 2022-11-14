# Change history for stripes-erm-components

## 8.0.0 In progress
* Removed all testing configuration and exports
* Removed DEPRECATED Components
  * LoadingPane
  * withAsyncValidation
  * withKiwtFieldArray
## 7.0.0 2022-10-26
* ERM-2390 Licenses fails to add internal contact
* ERM-2366 Core documents for a License shouldn't display a category
* ERM-2346 Related Entitlement endpoint unnecessarily hit on package view
* ERM-2344 Add link from an Agreement to an Agreement lines search filtered by the agreement
* ERM-2342 Responsive behaviour of Agreement search field selections
* ERM-2329 Move `@testing-library/react` to `deps` because test helpers are exported from index
* ERM-2315 Display all identifiers in a namespace for a resource
* ERM-2290 Add property options to Agreements text search
* ERM-2234 Replace withKiwtFieldArray with useKiwtFieldArray
* ERM-2215 Migrate ui-agreements Picklist Settings
* ERM-2133 Remove deprecations in Nolana
  * Card, CustomPropertiesConfigListFieldArray, CustomPropertiesList, CustomPropertyFilters, FormCustomProperties
  * customPropertyTypes, getOperators.js, getValueProps.js
  * remove index entries
  * remove react-final-form-html5-validation from package.json
* ERM-2044 Ability to make custom properties deprecated
* ERM-1343 Deprecate `withKiwtFieldArray` in preparation for removal in a future release
* ERM-1342 Deprecate `withAsyncValidation` in preparation for removal in a future release
* ERM-1332 Deprecate `<LoadingPane>` in preparation for removal in a future release

## 6.2.1 2022-07-29
* ERM-2300 On loading entitlements for Agreement edit screen incorrect parameters are supplied

## 6.2.0 2022-07-04
* ERM-2225 Amendment/License link status values do not update immediately after Agreement edit
* ERM-2175 Migrate Edit/Create routes to react-query where we have regressions
* ERM-2151 update outdated dependencies in stripes-erm-components
* ERM-2105 Refactor away from react-intl-safe-html
* ERM-2095 Replace babel-eslint with @babel/eslint-parser
* ERM-2066 Number of tags doesn't update on adding tags to agreement line
* ERM-2065 Error on opening Tags panel after creating new agreement line with eHoldings resource
* ERM-1971 Bump eslint-config stripes version
* FAT-80 stripes-erm-components: UI tests replacement with RTL/Jest
  * ERM-2041 Prepare stripes-erm-components for RTL Development
  * ERM-1334 OrganizationSelection
  * ERM-1331 LicenseEndDate
  * ERM-1330 LicenseCard
  * ERM-1329 InternalContactsFieldArray
  * ERM-1328 InternalContactSelection
  * ERM-1327 InternalContactCard
  * ERM-1325 FileUploaderField
  * ERM-1324 FileUploader
  * ERM-1322 EditCard
  * ERM-1321 EResourceType
  * ERM-1320 DuplicateModal
  * ERM-1319 DocumentsFieldArray
  * ERM-1318 DocumentCard
  * ERM-1313 AlternativeNamesFieldArray
* Deprecate `<Card>`, `<CustomPropertiesList>` in preparation for removal in a future release
* ERM-1315 Deprecate `<CustomPropertiesConfigListFieldArray>`, `<CustomPropertyField>` , `<CustomPropertyFieldEdit>` and `<CustomPropertyFieldView>`
* Deprecate `<CustomPropertyFilters>`, `<CustomPropertyFiltersForm>`, `<CustomPropertyRule>`, `<getValueProps>` and `<getOperators>` in preparation for removal in a future release
* Deprecate `<FormCustomProperties>`, `<CustomPropertiesListField>`, `<CustomPropertyValue>` in preparation for removal in a future release
* New hooks available for use
  * useTagsEnabled
  * useAsyncValidation
  * useFileHandlers
  * useUsers
  * useTags
  * useInfiniteFetch
  * useBatchedFetch

## 6.1.0 2022-03-02
* ERM-1949 ERM-1950 Added ActionMenu Component
* ERM-1928 Limit alternative names to 255 characters in UI
* ERM-1901 Use formattedNumber for custom properties with Integer type
* ERM-1897 Upgrade `@folio/react-intl-safe-html` for compatibility with `@folio/stripes` `v7`.
* ERM-1744 ERM-1745 Add Organisations to Agreements/Licenses simple search widget definition
* ERM-1700 Apply a four column layout to the User card for agreements and licenses and add link to Name
* Tweaks to useComposedRefs

## 6.0.0 2021-10-06
* Fixed bug with error on saving license/agreement if a change in made to the visibility (internal) flag of a primary property without populating it. ERM-1770 ERM-1771
* Upgrade to Stripes v7.
* Improved a11y and focus management. ERM-1826
* Added sort capability on license type by label. ERM-1693
* Added support for multiple roles per organisation in Agreements and Licenses. ERM-1540 ERM-1541

## 5.1.0 2021-06-04
* Added FormattedDateTime/InternalContactsArrayDisplay components ERM-1682/ERM-1683/ERM-1684
* Increase tags retrieved on opening tags panel and sort by label. ERM-1622
* Ensure runtime automatically chosen for test env - @babel/preset-react
* bumped babel-eslint dep to 10.0.0
* Increase size of credentials show hide button from 160px to 300px

## 5.0.0 2021-03-17
* Add FOLIO keyboard shortcuts to Agreements ERM-1151
* Setup React testing library and jest infrastructure. ERM-1216.
* Supplementary documents: Do not hide the Note field when empty. ERM-1221 ERM-1222
* Added keyboard shortcut handler for save. Handlers for other shortcuts now live in stripes-components.ERM-1239 ERM-1240 ERM-1241
* Change API for DateFilter to include resourceName and hideNoDateSetCheckbox. ERM-1532
* Update stripes-cli to v2 ERM-1550

## 4.0.1 2020-11-05
* Fixed issue with decimal separators not working as expected with non-English locales. ERM-1199.

## 4.0.0 2020-10-15
* Added `EResourceType`, `getResourceIdentifier`, `getSiblingIdentifier` and `isPackage` utility functions. ERM-958
* Added `Embargo` component. ERM-951
* Increment `@folio/stripes` to `v5.0`, `react-router` to `v5.2`.
* Remove `<CreateOrganizationModal>` component. ERM-1005
* Remove `<Spinner>` component. it's now in `stripes-components`. ERM-1005
* Remove deprecated `deleteButtonTooltipText` from `<DocumentsFieldArray>`. ERM-1005
* Replace `bigtest/mirage` with `miragejs`.
* Added alignment property to `Embargo` component, default to 'center'. ERM-1121

## 3.0.1 2020-07-06
* Fixed issue with only 10 results being retrieved for internal contacts fitler. ERM-980

## 3.0.0 2020-06-10
* Disallow whitespace-only strings in `requiredValidator`. ERM-553
* Upgrade to Stripes 4.0
* Added ability to filter agreements and licenses by their custom properties. ERM-876
* Added `withAsyncValidation` higher-order component. ERM-877
* Added `preventResourceRefresh` helper function. ERM-852
* Added `AlternativeNamesFieldArray` component. ERM-827 828
* Added `DuplicateModal` component. ERM-814
* Bumped the required node version to 10.

## 2.3.2 2020-05-27
* Removed character limit on text custom properties. ERM-901

## 2.3.1 2020-03-27
* Added `invalidNumberValidator`.
* Fixed validation of numbers formatted with European comma and period separators. ERM-768

## 2.3.0 2020-03-11
* Added `CustomPropertiesConfigListFieldArray` and `FormCustomProperties` components. ERM-683
* Changed `LicenseTermsList` component to `CustomPropertiesList`. ERM-683
* Deprecated `<Spinner>` in preparation for removal in 3.0.0. ERM-636
* Added @folio/react-intl-safe-html to dependencies. ERM-352
* Changed `FileUploader` to show a message banner at file upload errors. ERM-352
* Keyboard navigation and focus improvements. ERM-416 593 613 620 622 624 628
* Added `renderUserName` helper function to exports.
* Upgraded to Stripes 3.0
* Added confirmation prompt when deleting custom properties. ERM-730
* i18n fixes for numbers. ERM-719 747
* Added `generateQueryParam` function to supersede `getSASParams`. ERM-684

## 2.1.2 2019-12-04
* Temporarily disabled Jenkins tests for release.

## 2.1.1 2019-12-04
* Updated maximum file size message for `FileUploader`. ERM-625

## 2.1.0 2019-12-04
* Added `Tooltip`s for all the delete trash icons. ERM-310, ERM-509
* Updated `withKiwtFieldArray` with new `onUpdateField` function.
* Deprecation warning for `withKiwtFieldArray` usage with redux-form.
* Updated `InternalContactsFieldArray` with new "link" and "replace" verbiage. ERM-451 452 453
* Updated `OrganizationsFieldArray` with new "link" and "replace" verbiage. ERM-451 452 453

## 2.0.0 2019-10-04
* Changed `DocumentsFieldArray` to use React Final Form instead of Redux Form.
* Changed `InternalContactsFieldArray` to use React Final Form instead of Redux Form.
* Changed `EditOrganizationCard` to use React Final Form instead of Redux Form.
* Added `composeValidators` function to exports for use with React Final Form.
* Added `LoadingPane` component.

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
