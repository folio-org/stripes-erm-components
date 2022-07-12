import {
  interactor,
  text,
  isPresent,
} from '@interactors/html';

@interactor class LicenseCardInteractor {
  isLicenseCardNamePresent = isPresent('[data-test-license-card-name]');
  licenseCardName = text('[data-test-license-card-name]');
  isLicenseCardTypePresent = isPresent('[data-test-license-card-type]');
  licenseCardType = text('[data-test-license-card-type]');
  isLicenseCardStatusPresent = isPresent('[data-test-license-card-status]');
  licenseCardStatus = text('[data-test-license-card-status]');
  isStartDatePresent = isPresent('[data-test-license-card-start-date]');
  licenseCardStartDate = text('[data-test-license-card-start-date]');
  isEndDatePresent = isPresent('[data-test-license-card-end-date]');
  licenseCardEndDate = text('[data-test-license-card-end-date]');
  isPrimaryOrgPresent = isPresent('[data-test-license-card-primary-org-name]');
  primaryOrg = text('[data-test-license-card-primary-org-name]');
}

export default LicenseCardInteractor;
