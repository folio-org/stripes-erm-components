import {
  interactor,
  text,
  isPresent,
  count,
  collection
} from '@interactors/html';

@interactor class CustomPropertyInteractor {
  isLabelPresent = isPresent('[data-test-customproperty-label]');
  isNotePresent = isPresent('[data-test-customproperty-note]');
  isPublicNotePresent = isPresent('[data-test-customproperty-public-note]');
  isValuePresent = isPresent('[data-test-customproperty-value]');
  isVisibilityPresent = isPresent('[data-test-customproperty-visibility]');
  label = text('[data-test-customproperty-label]');
  note = text('[data-test-customproperty-note]');
  publicNote = text('[data-test-customproperty-public-note]');
  value = text('[data-test-customproperty-value]');
}

@interactor class CustomPropertiesListInteractor {
  isPropertyPresent = isPresent('[data-test-customproperty]');
  count = count('[data-test-customproperty]');
  property = collection('[data-test-customproperty]', CustomPropertyInteractor);
}

export default CustomPropertiesListInteractor;
