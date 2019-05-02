import {
  interactor,
  text,
  isPresent,
  count,
  collection
} from '@bigtest/interactor';

@interactor class LicenseTermInteractor {
  isLabelPresent = isPresent('[data-test-term-label]');
  isValuePresent = isPresent('[data-test-term-value]');
  label = text('[data-test-term-label]');
  value = text('[data-test-term-value]');
}

@interactor class LicenseTermsListInteractor {
  isLicenseTermPresent = isPresent('[data-test-layout]');
  count = count('[data-test-layout]');
  licenseTerm = collection('[data-test-layout]', LicenseTermInteractor);
}

export default LicenseTermsListInteractor;
