import {
  interactor,
  text,
  isPresent,
  count,
  collection
} from '@bigtest/interactor';

@interactor class LicenseTermInteractor {
  isLabelPresent = isPresent('[data-test-term-label]');
  isNamePresent = isPresent('[data-test-term-name]');
  label = text('[data-test-term-label]');
  name = text('[data-test-term-name]');
}

@interactor class LicenseTermsListInteractor {
  isLicenseTermPresent = isPresent('[data-test-layout]');
  count = count('[data-test-layout]');
  licenseTerm = collection('[data-test-layout]', LicenseTermInteractor);
}

export default LicenseTermsListInteractor;
