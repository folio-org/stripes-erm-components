import {
  clickable,
  interactor,
  text,
  value,
  isPresent,
  count,
  collection
} from '@bigtest/interactor';

@interactor class CustomPropertyInteractor {
  isLabelPresent = isPresent('[data-test-card-header-start]');
  isVisibilityPresent = isPresent('[data-test-customproperty-visibility]');
  isValuePresent = isPresent('[data-test-customproperty-value]');
  isNotePresent = isPresent('[data-test-customproperty-note]');
  isPublicNotePresent = isPresent('[data-test-customproperty-public-note]');

  label = text('[data-test-card-header-start]');
  visibility = value('[data-test-customproperty-visibility]');
  value = text('[data-test-customproperty-value]');
  note = text('[data-test-customproperty-note]');
}

@interactor class FormCustomPropertiesInteractor {
  isCustomPropertyPresent = isPresent('[data-test-customproperty]');
  isAddButtonPresent = isPresent('#add-customproperty-btn');
  clickAddButton = clickable('#add-customproperty-btn');
  count = count('[data-test-card-body]');
  customPropertyInteractor = collection('[data-test-customproperty]', CustomPropertyInteractor);
}

export default FormCustomPropertiesInteractor;
