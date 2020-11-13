import {
  interactor,
  text,
  isPresent,
} from '@bigtest/interactor';

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
  isLicensorPresent = isPresent('[data-test-license-card-licensor-name]');
  licensor = text('[data-test-license-card-licensor-name]');
}

export default LicenseCardInteractor;
