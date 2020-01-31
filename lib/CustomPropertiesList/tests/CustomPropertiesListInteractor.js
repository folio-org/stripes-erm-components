import {
  interactor,
  text,
  isPresent,
  count,
  collection
} from '@bigtest/interactor';

@interactor class CustomPropertyInteractor {
  isLabelPresent = isPresent('[data-test-term-label]');
  isNotePresent = isPresent('[data-test-term-note]');
  isPublicNotePresent = isPresent('[data-test-term-public-note]');
  isValuePresent = isPresent('[data-test-term-value]');
  isVisibilityPresent = isPresent('[data-test-term-visibility]');
  label = text('[data-test-term-label]');
  note = text('[data-test-term-note]');
  publicNote = text('[data-test-term-public-note]');
  value = text('[data-test-term-value]');
}

@interactor class CustomPropertiesListInteractor {
  isLicenseTermPresent = isPresent('[data-test-term]');
  count = count('[data-test-term]');
  licenseTerm = collection('[data-test-term]', CustomPropertyInteractor);
}

export default CustomPropertiesListInteractor;
