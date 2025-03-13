# Change history for stripes-erm-components

## 10.0.0 2025-03-13
  * ERM-3606 *BREAKING* Stripes v10 dependencies update
    * Updated all stripes-* dependencies for the stripes v10 upgrade along with react-intl and formatjs/cli
  * ERM-3452 Centralise content filter array used in Licenses and Agreements
  * ERM-3429 Set up RefdataSelect component 
  * UISER-185 Change to paginated display in the serials and piece sets search and sort results

## 9.2.1 2024-11-27
  * ERM-3431 License Export as CSV does not result in file download

## 9.2.0 2024-10-31
  * ERM-3373 Update module license and guidance for stripes-erm-components
  * ERM-3344 Move GitHub actions to shared workflows
  * ERM-3332 Add documents filter to agreement line search
  * ERM-3297 Block save on invalid date in agreement edit
  * ERM-3273 React v19: refactor stripes-erm-components away from default props for functional components
  * ERM-3249 Upgrade useFetchMultiplePages to allow an arbitrary selection of pages to be fetched at once

## 9.1.2 2024-05-28
  * ERM-3220 Update pagination mechanisms for MCLs to work without stats
    * useFetchMultiplePages hook
    * usePrevNextPagination hook prop "hasNextPage"
  * Translations

## 9.1.1 2024-04-19
  * ERM-3186 Change default search options for LocalKB titles to exclude identifiers
    * Added defaultSearchKey to useSASQQIndex, allowing for differing behaviour of default qIndex and default search (With no qIndex specified)
  * ERM-3172 The failure of reference object when displaying agreement line should be handled elegantly
    * New ErrorCard components
  * formatJS dependency updated
  * Translations
  * Added number field utilities
    * preventMinusKey -- prevent typing of `-` key in number text field
    * preventPasteNegative -- prevent pasting of negative number in number text field

## 9.1.0 2024-03-22
* ERM-3129 Remove explicit typescript version
* ERM-3126 Misleading tailing comma in OrganizationsArrayDisplay
* ERM-3119 Add Organisation status to organisation card display
* ERM-3062 Add has/has not filter in Licenses and amendments
* ERM-3059 Filter for supplementary documents in License amendments
* ERM-3058 Filter for supplementary documents in Licenses
* ERM-3057 Filter for core documents in License amendments
* ERM-3056 Filter for core documents in Licenses
* ERM-3041 Dashboard: the "unsaved changes" confirmation modal is missing
* ERM-2981 Standardise use of external url validator library across ERM apps
* usePrevNextPagination null safety (yarn test warnings)
* Refactor to move utilities tp dedicated directory
* feat: getIdsFromUrl #654

## 9.0.0 2023-10-12
* Added useParallelBatchFetch hook
  * For batch fetching KIWT resources
  * API more in line with useChunkedCQLFetch -- and in parallel
* Added selectifyRefdata utility for using refdata within select fields
* Added usePrevious hook for use within RolesFieldArray
* ERM-3045 Swap Logs component to prev-next pagination
  * Set up centralised Log component for use in other modules
  * Swapped to prev-next pagination for logs
* ERM-3040 Dashboard: "New" badge is wrapping onto two lines
* ERM-3001 Update Node.js to v18 in GitHub Actions
* ERM-2978 Edition, volume, issue render on new line 
* ERM-2973 Replace naive fetch hooks with parallelised ones (and deprecate)
  * ERM-2974 Removed useBatchedFetch
  * ERM-2975 Removed useUsers
  * ERM-2976 InternalContactsSelection now uses useParallelBatchFetch
  * STRIPES-870 BREAKING upgrade react to v18
    * ERM-2989 Upgrade stripes-erm-components React to v18
  * Deprecated useChunkedCQLFetch -- can import from stripes/core now
* ERM-2961 Extend length of document URL to 2048 chars
* ERM-2938 Return undefined, not null, from functions passed to useEffect
* ERM-2937 Added usePrevNextPagination hook
* ERM-2929 InternalContactSelection gets stuck in fetch loop
* ERM-2064 Move large file upload warning in document to a toast message
* STRIPES-868 *BREAKING* bump `react-intl` to `v6.4.4`
  * ERM-3034 Upgrade `react-intl` to `v6.4.4`
* STRIPES-870 *BREAKING* upgrade react to v18
  * ERM-2989 Upgrade stripes-erm-components React to v18
* SI-24 Avoid double encoding of user entered URLs in simple search widget

## 8.0.0 2023-02-22
* ERM-2634 If an agreement or license has >10 contacts they do not all display correctly
* ERM-2632 Add a "copy" icon to copy the reference text used in the document type/reference MCL
* ERM-2622 Refactor OrganizationSelection to react-query
* ERM-2621 Refactor InternalContactSelection to react-query
* ERM-2560 Increment stripes-erm-components to Stripes v8
* ERM-2547 On agreement and license user details do not display when more than one user linked to agreement/license as Internal contact
* ERM-2533 Refactor interfaces code to react-query
* ERM-2474 Local KB admin: Info log export populates title element in additionalInfo with non-relevant data
* ERM-2467 Change export file name and file extension in Agreements and Local KB admin
* ERM-2463 Implement FormattedDateTime Interactor Pattern
* ERM-2453 Switch stripes-erm-components to tests using stripes-erm-testing
* ERM-2449 Add Cancellation date filter to Agreements search and sort
* ERM-2423 Performance issues on displaying external agreement lines
* ERM-2314 Managed Dashboards UI: managing available dashboards
* ERM-2313 Managed Dashboards UI: managing users access to a dashboard
* ERM-2292 Remove BigTest/Nightmare dependencies and tests (stripes-erm-components)
* ERM-2289 Agreement line search and filter screen initial implementation
* ERM-2235 Remove deprecations in Orchid
* ERM-1304 Add test coverage for ui-plugin-find-agreement <AgreementSearch>
* Removed all testing configuration and exports
* Removed DEPRECATED Components
  * LoadingPane
  * withAsyncValidation
  * withKiwtFieldArray
* Upgrade `react-redux` to `v8`. Refs ERM-2616.

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
